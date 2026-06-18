 
#!/bin/bash
#*** DESCRIPTION ********************************************************
#
# MODULE:          Setup a kind cluster for running Playwright tests and monitoring with Prometheus and Grafana.
#
# DESCRIPTION:     - run ubuntu image
#                  - install node and npm
#                  - copy playwright project to the container
#                  - execute Playwright tests
#                  - copy results to Jenkins workspace
#                  - install prometheus and grafana for monitoring
#                  
#                   
# OWNER:           Virgil Buse
#                  
#
#*** DESCRIPTION *********************************************************
secret="$1"
RED="\033[0;31m"
NC='\033[0m'
BLUE="\033[0;34m"
PURPLE="\033[0;35m"
BBlue="\033[01;36m"
Green="\033[0;32m"
White="\033[00m"
Yellow="\033[01;33m"

#Check if kind cluster is up------------------------------------------------#
function check_kind_online() { 
status=$(ps -ef | grep -v grep | grep "/etc/kubernetes/pki/etcd/server.crt" | awk '{print $8 }' | cut -d "%" -f1 -)
if [[ "$status" == "etcd" ]]; then
echo -e "${Green}Kind is online${NC}"
else
echo -e "${RED}Kind is offline.Starting kind cluster${NC}"
kind create cluster --config kind-config.yaml
echo -e "${RED}Don't forget to set the kubeconfig${NC}"
fi
}

#Check if nodes are ready---------------------------------------------------------#
function check_nodes_ready() { 
for ((i=1;i<50;i++)) do
   statusReady=$(kubectl get nodes | awk '{print $2 }' | cut -d "%" -f1 -| grep -cU '\bReady\b')
	if [[ "$statusReady" != 3 ]]; then
	echo -e "${BBlue}Waiting for nodes to be ready...${NC}"
	sleep 45
	else
	sleep 30
	echo -e "${Green}All nodes are ready${NC}"
	break
	fi
done
}

#Deploy yaml file for linux container---------------------------------------------------------#
function deploying_linux() { 
echo -e "${BBlue}Executing yaml files${NC}"
kubectl apply -f kind-playwright.yaml #instal and execute playwright
#chmod -R 777 /home/corneliusmaximus/persistentVolume/
for ((i=1;i<50;i++)) do
    statusRun1=$(kubectl get pods -n default | grep 'Running\|Completed'| awk '{print $3 }' | cut -d "%" -f1 -)
        if [[ $statusRun1 != "Running" ]]; then
        echo -e "${BBlue}Waiting for the pods to run...${NC}"
        sleep 20
        else
        echo -e "${Green}Pod is running${NC}"
        break
        fi
done
}

#Copy resources into the container-------------------------#
function copy_resources() { 
POD=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
	kubectl exec -i $POD -- ls /var/POC-Jenkins-Kubernetes/ | grep "playwright.config.ts" 2>/dev/null 1>/dev/null
        if [[ $? != "0" ]]; then
        echo -e "${PURPLE}Ups! Files not found. Copying files into the container...${NC}"
	kubectl cp . default/$POD:/var/POC-Jenkins-Kubernetes/
	kubectl exec -i $POD -- chmod -R 777 /var/POC-Jenkins-Kubernetes/
        kubectl exec -i $POD -- ls /var/POC-Jenkins-Kubernetes/
        else
        echo -e "${Green}Files already there.${NC}"
        fi
}

#Check node/npm version-------------------------#
function verify_node_npm() { 
POD4=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
for ((i=1;i<50;i++)) do
	kubectl exec -i $POD4 -- /bin/bash -c "npm -v" 2>/dev/null 1>/dev/null
        if [[ $? != "0" ]]; then
        echo -e "${BBlue}Waiting for node/npm installation${NC}"
        sleep 30
        else
        echo -e "${Green}Actual npm and node versions:${NC}"
        kubectl exec -i $POD4 -- /bin/bash -c "npm -v"
        kubectl exec -i $POD4 -- /bin/bash -c "node -v"
        break
        fi
done
}

#Install and execute Playwright tests-------------------------#
function install_execute_playwright_tests() {    
POD2=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
        echo -e "${BBlue}Waiting for npm ci and playwright installation...${NC}"
	kubectl exec -i $POD2 -- /bin/bash -c "cd /var/POC-Jenkins-Kubernetes/ && npm ci && npx playwright install --with-deps" 2>/dev/null 1>/dev/null
        echo -e "${BBlue}Executing Playwright tests...${NC}"
        kubectl exec -i $POD2 -- /bin/bash -c "cd /var/POC-Jenkins-Kubernetes/ && SECRET_KEY=$secret npm run test_demo_headless"
}

#Copy playwright results locally-------------------------#
function copy_playwright_results() { 
POD3=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
for ((i=1;i<30;i++)) do
        kubectl exec -i $POD3 -- ls /var/POC-Jenkins-Kubernetes/test-results/ | grep "test-results.xml" 2>/dev/null 1>/dev/null
        if [[ $? != "0" ]]; then
        sleep 20
        echo -e "${BBlue}Waiting for results...${NC}"	
        else
        sleep 5
        kubectl cp default/$POD3:/var/POC-Jenkins-Kubernetes/test-results/test-results.xml ./test-results.xml 2>/dev/null 1>/dev/null
        kubectl cp default/$POD3:/var/POC-Jenkins-Kubernetes/allure-results/ ./allure-results/ 2>/dev/null 1>/dev/null
        echo -e "${Green}Results are ready.${NC}"
        break
        fi
done
}

#Verify/install prometheus and grafana-------------------------#
function verify_install_prometheus_grafana() {
statusRun3=$(kubectl get pods -n monitoring | grep 'prometheus-grafana'| awk '{print $3 }' | cut -d "%" -f1 -)
        if [[ $statusRun3 == "Running" ]]; then
        echo -e "${BBlue}Check all prometheus and grafana are running.${NC}"
        	while [ "$(kubectl get pods --field-selector=status.phase=Running -n monitoring | grep -c prometheus)" != 8 ]
  		do
  		echo -e "${BBlue}Waiting to run all the pods...${NC}"
    		sleep 35
  		done
  		echo -e "${Green}All prometheus and grafana pods are running${NC}"
        else
        echo -e "${RED}Prometheus and Grafana not installed.Proceed with installation${NC}"
        helm install prometheus prometheus-community/kube-prometheus-stack --version 82.16.0 --namespace monitoring --create-namespace
                while [ "$(kubectl get pods --field-selector=status.phase=Running -n monitoring | grep -c prometheus)" != 8 ]
  		do
  		echo -e "${BBlue}Waiting to run all the pods...${NC}"
    		sleep 35
  		done
  		echo -e "${Green}All prometheus and grafana pods installed and successfully running${NC}"
        fi
kubectl get pods -n monitoring
echo -e "${RED}Grafana pass:${NC}";kubectl get secret -n monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --d; echo
}

#Expose prometheus and grafana-------------------------#
function tunneling_port_forward() { 
echo -e "${BBlue}Starting the port forward for prometheus and grafana...${NC}"
gnome-terminal -- /bin/sh -c 'kubectl port-forward -n monitoring svc/prometheus-grafana 3030:80'
gnome-terminal -- /bin/sh -c 'kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090'

echo -e "${BBlue}Starting kind routing${NC}"
gnome-terminal -- /bin/sh -c 'sudo cloud-provider-kind'  # for web routing if u have a site
sleep 5

}

#CORE-------------------------------------------------------------------------------------#
check_kind_online
check_nodes_ready
deploying_linux
copy_resources
verify_node_npm
install_execute_playwright_tests
copy_playwright_results
verify_install_prometheus_grafana
#tunneling_port_forward
sleep 30
kubectl get svc -o wide
exit 0



