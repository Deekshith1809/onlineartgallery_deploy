# Quick Start Guide - Art Gallery Ansible Deployment

## 5-Minute Setup

### 1. Prerequisites Check

```bash
# Install required tools
pip install ansible jinja2 pyyaml

# Verify installation
ansible --version
```

### 2. Navigate to ansible directory

```bash
cd c:\oag(fsad)\ansible
chmod +x *.sh
```

### 3. Configure Secrets

```bash
# Create/edit secrets file
cat > vars/secrets.yml <<EOF
---
docker_username: deekshith1809
docker_password: YOUR_PASSWORD_HERE
mysql_root_password: Deekshith@123
mysql_user: root
mysql_password: Deekshith@123
EOF
```

### 4. Deploy to Docker (Local)

```bash
# For local machine (no inventory needed)
ansible-playbook deploy.yml -i inventory.ini -c local
```

### 5. Verify Deployment

```bash
./verify_deployment.sh
```

## Access Application

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:2025  
**MySQL:** localhost:3307

---

## Kubernetes Deployment (5 Steps)

### 1. Update inventory for K8s

```bash
cat >> inventory.ini <<EOF

[k8s_servers]
localhost ansible_connection=local
EOF
```

### 2. Deploy to Kubernetes

```bash
ansible-playbook deploy.yml -i inventory.ini \
  -e deployment_platform=kubernetes \
  -c local
```

### 3. Monitor deployment

```bash
kubectl get pods -n artgallery -w
```

### 4. Get access info

```bash
# Get NodePort info
kubectl get svc -n artgallery

# Frontend: http://<node-ip>:31577
# Backend: http://<node-ip>:30855
```

### 5. Health check

```bash
./healthcheck.sh
```

---

## Common Tasks

### View Logs

```bash
# Docker
docker logs artgallery-backend -f

# Kubernetes
kubectl logs -n artgallery -f deployment/artgallery-backend
```

### Restart Services

```bash
# Docker
docker restart artgallery-backend artgallery-frontend

# Kubernetes
kubectl rollout restart deployment/artgallery-backend -n artgallery
```

### Stop Services

```bash
# Docker
docker-compose down  # if using docker-compose

# Kubernetes
kubectl delete -n artgallery all --all
```

### Clean Up

```bash
# Remove all containers
docker rm -f artgallery-*

# Remove volumes
docker volume rm $(docker volume ls -q | grep artgallery)

# Remove K8s resources
kubectl delete namespace artgallery
```

---

## Troubleshooting

### Login not working on K8s?

Update CORS in backend (already fixed):
- Backend allows: `http://localhost:5175` (for local dev)
- Need to add K8s frontend URL: Use the NodePort IP

### Container not starting?

```bash
# Check logs
docker logs artgallery-backend

# Check if port is already in use
lsof -i :2025
```

### Database connection error?

```bash
# Verify MySQL is running
docker exec artgallery-mysql mysql -u root -pDeekshith@123 -e "SELECT 1"
```

---

## Next Steps

- Read full [README.md](./README.md) for advanced options
- Setup CI/CD in GitHub Actions
- Configure monitoring with Prometheus & Grafana
- Setup SSL/TLS certificates

---

For detailed documentation, see [README.md](./README.md)
