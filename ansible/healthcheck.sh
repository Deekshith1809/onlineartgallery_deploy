#!/bin/bash
# Health check script for Art Gallery services

DOCKER_CONTAINERS=("artgallery-frontend" "artgallery-backend" "artgallery-mysql")
K8S_PODS=("artgallery-frontend" "artgallery-backend" "mysql-deployment")

echo "=== Art Gallery Health Check ==="
echo "Time: $(date)"
echo ""

# Check Docker containers
echo "Docker Containers:"
for container in "${DOCKER_CONTAINERS[@]}"; do
    if docker ps --filter "name=$container" --quiet &> /dev/null; then
        status=$(docker inspect -f '{{.State.Status}}' "$container" 2>/dev/null)
        echo "  ✓ $container: $status"
    else
        echo "  ✗ $container: NOT RUNNING"
    fi
done

echo ""

# Check Kubernetes pods
if command -v kubectl &> /dev/null; then
    echo "Kubernetes Pods:"
    kubectl get pods -n artgallery -o wide 2>/dev/null || echo "  Note: Kubernetes not configured"
    echo ""
fi

# Check network connectivity
echo "Network Connectivity:"
echo -n "  Frontend (port 3000): "
nc -z localhost 3000 2>/dev/null && echo "✓ OK" || echo "✗ FAILED"

echo -n "  Backend (port 2025): "
nc -z localhost 2025 2>/dev/null && echo "✓ OK" || echo "✗ FAILED"

echo -n "  MySQL (port 3307): "
nc -z localhost 3307 2>/dev/null && echo "✓ OK" || echo "✗ FAILED"

echo ""
echo "=== End Health Check ==="
