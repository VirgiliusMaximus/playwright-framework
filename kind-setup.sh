 
#!/bin/bash
#*** DESCRIPTION ********************************************************
#
# MODULE:          Setup and start my app using kind cluster
#
# DESCRIPTION:     - run ubuntu image
#                  - install apache2 and php-apache
#                  - deploy site to the container
#                  - install prometheus and grafana for monitoring
#                  - redirect traffic
#                  
#                   
#
# OWNER:           Virgil Buse
#                  
#
#*** DESCRIPTION *********************************************************

RED="\033[0;31m"
NC='\033[0m'
BLUE="\033[0;34m"
PURPLE="\033[0;35m"
BBlue="\033[01;36m"
Green="\033[0;32m"
White="\033[00m"
Yellow="\033[01;33m"

#Check if minikube cluster is online------------------------------------------------#
function check_kind_online() { 
status=$(ps -ef | grep -v grep | grep "/etc/kubernetes/controller-manager.conf" | awk '{print $8 }' | cut -d "%" -f1 -)
if [[ "$status" == "kube-controller-manager" ]]; then
echo -e "${Green}Kind is online${NC}"
else
echo -e "${RED}Kind is offline.Starting kind cluster${NC}"
kind create cluster --config kind-config.yaml
fi
}

function check_nodes_ready() { 
for ((i=1;i<500;i++)) do
   statusReady=$(kubectl get nodes | awk '{print $2 }' | cut -d "%" -f1 -| grep -cU '\bReady\b')
	if [[ "$statusReady" != 3 ]]; then
	echo -e "${PURPLE}Waiting for nodes to be ready...${NC}"
	sleep 45
	else
	sleep 30
	echo -e "${Green}All nodes are ready${NC}"
	break
	fi
done

}

#Deploy my yaml file---------------------------------------------------------#
function deploying_linux() { 
echo -e "${BBlue}Executing yaml files${NC}"
kubectl apply -f kind-playwright.yaml #instal and execute playwright
chmod -R 777 /home/corneliusmaximus/persistentVolume/
for ((i=1;i<5000;i++)) do
    statusRun1=$(kubectl get pods -n default | grep 'Running\|Completed'| awk '{print $3 }' | cut -d "%" -f1 -)
        if [[ $statusRun1 != "Running" ]]; then
        echo -e "${PURPLE}Waiting for the pods to run...${NC}"
        sleep 20
        else
        echo -e "${Green}Pod is running${NC}"
        break
        fi
done
}



#Copy site resources into the container-------------------------#
function copy_resources() { 
POD=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
	kubectl exec -it $POD -- ls /var/www/html/POC-Jenkins-Kubernetes/ | grep "playwright.config.ts" 2>/dev/null 1>/dev/null
        if [[ $? != "0" ]]; then
        echo -e "${BBlue}Copying files into the container${NC}"
	kubectl cp /home/corneliusmaximus/POC-Jenkins-Kubernetes/ default/$POD:/var/www/html/
	kubectl exec -it $POD -- chmod -R 777 /var/www/html/POC-Jenkins-Kubernetes/
        else
        echo -e "${Green}Files already there.${NC}"
        fi


}
#Copy site resources into the container-------------------------#
function execute_playwright_tests() { 
POD2=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
	kubectl exec -it $POD2 -- /bin/bash -c "cd /var/www/html/POC-Jenkins-Kubernetes/; npx playwright test"
}

#Copy playwright results locally-------------------------#
function copy_playwright_results() { 
POD3=$(kubectl get pod -l app=virgilius-app -o jsonpath="{.items[0].metadata.name}")
for ((i=1;i<5000;i++)) do
kubectl exec -it $POD3 -- ls /var/www/html/POC-Jenkins-Kubernetes/test-results/ | grep "test-results.xml" 2>/dev/null 1>/dev/null
        if [[ $? != "0" ]]; then
        echo -e "${BBlue}Waiting for results...${NC}"	
        else
        kubectl cp default/$POD3:/var/www/html/POC-Jenkins-Kubernetes/test-results/test-results.xml ./home/corneliusmaximus/POC-Jenkins-Kubernetes/test-results/test-results.xml
        echo -e "${Green}Files copied${NC}"
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
  		echo -e "${PURPLE}Waiting to run all the pods...${NC}"
    		sleep 35
  		done
  		echo -e "${Green}All prometheus and grafana pods are running${NC}"
        else
        echo -e "${RED}Prometheus and Grafana not installed.Proceed with installation${NC}"
        helm install prometheus prometheus-community/kube-prometheus-stack --version 82.16.0 --namespace monitoring --create-namespace
                while [ "$(kubectl get pods --field-selector=status.phase=Running -n monitoring | grep -c prometheus)" != 8 ]
  		do
  		echo -e "${PURPLE}Waiting to run all the pods...${NC}"
    		sleep 35
  		done
  		echo -e "${Green}All prometheus and grafana pods installed and successfully running${NC}"
        fi
kubectl get pods -n monitoring
echo -e "${RED}Grafana pass:${NC}";kubectl get secret -n monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --d; echo
}

#Create tunneling with minikube and port forward for prometheus/grafana-------------------------#
function tunneling_port_forward() { 
echo -e "${BBlue}Starting the port forward${NC}"
gnome-terminal -- /bin/sh -c 'kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80'
gnome-terminal -- /bin/sh -c 'kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090'

echo -e "${BBlue}Starting kind routing${NC}"
gnome-terminal -- /bin/sh -c 'sudo cloud-provider-kind'
sleep 5

}

#CORE-------------------------------------------------------------------------------------#
#check_kind_online
#check_nodes_ready
deploying_linux
verify_apache_online
copy_resources
execute_playwright_tests
copy_playwright_results
#verify_install_prometheus_grafana
#tunneling_port_forward
#sleep 30
#kubectl get svc -o wide
exit 0



