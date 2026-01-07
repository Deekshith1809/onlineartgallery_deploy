#!/bin/bash
# Deployment verification script

set -e

echo "=== Art Gallery Deployment Verification ==="
echo ""

# Check if containers exist and are running
check_docker_deployment() {
    echo "Checking Docker Deployment..."
    
    containers=("artgallery-frontend" "artgallery-backend" "artgallery-mysql")
    all_running=true
    
    for container in "${containers[@]}"; do
        if docker ps --filter "name=$container" --quiet | grep -q .; then
            echo "  ✓ $container is running"
        else
            echo "  ✗ $container is NOT running"
            all_running=false
        fi
    done
    
    if [ "$all_running" = true ]; then
        echo "✓ Docker deployment successful!"
        return 0
    else
        echo "✗ Docker deployment has issues"
        return 1
    fi
}

# Check Kubernetes deployment
check_k8s_deployment() {
    echo ""
    echo "Checking Kubernetes Deployment..."
    
    if ! command -v kubectl &> /dev/null; then
        echo "  kubectl not found, skipping K8s check"
        return 0
    fi
    
    deployments=$(kubectl get deployments -n artgallery -o jsonpath='{.items[*].metadata.name}' 2>/dev/null)
    
    if [ -n "$deployments" ]; then
        echo "  ✓ Found Kubernetes deployments: $deployments"
        
        # Check pod status
        ready_pods=$(kubectl get pods -n artgallery -o jsonpath='{.items[*].status.conditions[?(@.type=="Ready")].status}' | grep -c "True" || echo "0")
        total_pods=$(kubectl get pods -n artgallery -o jsonpath='{.items | length}')
        
        echo "  ✓ Ready pods: $ready_pods/$total_pods"
        
        if [ "$ready_pods" -eq "$total_pods" ] && [ "$total_pods" -gt 0 ]; then
            echo "✓ Kubernetes deployment successful!"
            return 0
        else
            echo "⚠ Some pods are not ready yet"
            return 1
        fi
    else
        echo "  Note: No K8s deployments found"
        return 0
    fi
}

# Main checks
check_docker_deployment
check_k8s_deployment

echo ""
echo "=== Verification Complete ==="
