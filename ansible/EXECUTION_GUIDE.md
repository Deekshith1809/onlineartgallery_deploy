# 🚀 Ansible Automation - Execution Guide

## Overview

Your Art Gallery application now has **production-ready Ansible automation** that can deploy to both Docker and Kubernetes environments.

---

## 📦 What Was Created

### Core Files
- ✅ `deploy.yml` - Main orchestration playbook
- ✅ `inventory.ini` - Host and variable configuration
- ✅ `requirements.yml` - Ansible dependencies
- ✅ `rollback.yml` - Rollback/recovery playbook

### Roles (6 Modular Components)
- ✅ `roles/docker/` - Docker installation and setup
- ✅ `roles/database/` - MySQL deployment
- ✅ `roles/backend/` - Spring Boot backend
- ✅ `roles/frontend/` - React frontend
- ✅ `roles/kubernetes/` - Kubernetes orchestration
- ✅ `roles/monitoring/` - Prometheus & Grafana

### Configuration
- ✅ `vars/main.yml` - All configuration variables
- ✅ `vars/secrets.yml` - Sensitive credentials

### Documentation
- ✅ `README.md` - Complete reference (30+ sections)
- ✅ `QUICKSTART.md` - 5-minute setup guide
- ✅ `DEPLOYMENT_SUMMARY.md` - Feature overview
- ✅ `EXECUTION_GUIDE.md` - This file

### Helper Scripts
- ✅ `setup.sh` - Environment initialization
- ✅ `healthcheck.sh` - Service health verification
- ✅ `verify_deployment.sh` - Deployment validation

---

## 🎯 Getting Started

### Step 1: Install Ansible

On Linux/macOS:
```bash
pip install ansible ansible-core jinja2 pyyaml
ansible-galaxy collection install -r requirements.yml
```

On Windows (with WSL):
```bash
wsl
pip install ansible ansible-core jinja2 pyyaml
ansible-galaxy collection install -r requirements.yml
```

### Step 2: Configure Credentials

Edit `vars/secrets.yml`:
```bash
nano vars/secrets.yml
```

Update with your credentials:
```yaml
docker_username: deekshith1809
docker_password: YOUR_PASSWORD
mysql_root_password: Deekshith@123
mysql_user: root
mysql_password: Deekshith@123
```

### Step 3: Deploy Application

#### Option A: Docker Deployment (Local/Dev)
```bash
# Deploy all services to Docker
ansible-playbook deploy.yml -i inventory.ini -c local

# Or deploy specific component
ansible-playbook deploy.yml -i inventory.ini -c local -t backend
```

#### Option B: Kubernetes Deployment
```bash
# Deploy to your Kubernetes cluster
ansible-playbook deploy.yml -i inventory.ini \
  -e deployment_platform=kubernetes \
  -c local
```

### Step 4: Verify Deployment

```bash
# Run health checks
./healthcheck.sh

# Verify deployment status
./verify_deployment.sh
```

---

## 📊 Deployment Options

### Tag-Based Deployment (Deploy Specific Components)

```bash
# Only database
ansible-playbook deploy.yml -i inventory.ini -t database -c local

# Only backend
ansible-playbook deploy.yml -i inventory.ini -t backend -c local

# Only frontend
ansible-playbook deploy.yml -i inventory.ini -t frontend -c local

# Frontend and backend (skip database)
ansible-playbook deploy.yml -i inventory.ini -t backend,frontend -c local

# Skip monitoring
ansible-playbook deploy.yml -i inventory.ini --skip-tags monitoring -c local
```

### Dry-Run (Preview Changes)

```bash
# See what would be deployed without actually deploying
ansible-playbook deploy.yml -i inventory.ini --check -c local
```

### Verbose Output (Debugging)

```bash
# Show detailed execution logs
ansible-playbook deploy.yml -i inventory.ini -v -c local    # -v
ansible-playbook deploy.yml -i inventory.ini -vv -c local   # -vv (more)
ansible-playbook deploy.yml -i inventory.ini -vvv -c local  # -vvv (most)
```

---

## 🔗 Accessing Your Application

### After Docker Deployment
```
Frontend:  http://localhost:3000
Backend:   http://localhost:2025
MySQL:     localhost:3307
```

### After Kubernetes Deployment
```
Frontend:  http://<minikube-ip>:31577
Backend:   http://<minikube-ip>:30855
MySQL:     <service-name>.artgallery:3306
```

Get Minikube IP:
```bash
minikube ip
```

---

## 🛠️ Common Management Tasks

### View Service Logs

**Docker:**
```bash
docker logs -f artgallery-backend
docker logs -f artgallery-frontend
docker logs -f artgallery-mysql
```

**Kubernetes:**
```bash
kubectl logs -f deployment/artgallery-backend -n artgallery
kubectl logs -f deployment/artgallery-frontend -n artgallery
kubectl logs -f deployment/mysql-deployment -n artgallery
```

### Restart Services

**Docker:**
```bash
docker restart artgallery-backend
docker restart artgallery-frontend
```

**Kubernetes:**
```bash
kubectl rollout restart deployment/artgallery-backend -n artgallery
kubectl rollout restart deployment/artgallery-frontend -n artgallery
```

### Scale Services (Kubernetes)

```bash
# Scale backend to 5 replicas
kubectl scale deployment/artgallery-backend --replicas=5 -n artgallery

# Scale frontend to 3 replicas
kubectl scale deployment/artgallery-frontend --replicas=3 -n artgallery
```

### Check Service Status

**Docker:**
```bash
docker ps | grep artgallery
```

**Kubernetes:**
```bash
kubectl get pods -n artgallery
kubectl get svc -n artgallery
kubectl describe pod <pod-name> -n artgallery
```

---

## 🔄 Rollback Procedure

If something goes wrong, rollback using:

```bash
# For Kubernetes
ansible-playbook rollback.yml -i inventory.ini -e deployment_platform=kubernetes -c local

# For Docker
docker restart artgallery-backend artgallery-frontend
```

---

## 🔒 Security Best Practices

### 1. Use Vault for Secrets

```bash
# Encrypt secrets file
ansible-vault encrypt vars/secrets.yml

# Run playbook with vault
ansible-playbook deploy.yml -i inventory.ini --ask-vault-pass -c local
```

### 2. Restrict File Permissions

```bash
chmod 600 vars/secrets.yml
chmod 600 ~/.vault_pass
```

### 3. Update Docker Credentials Regularly

```bash
# In vars/secrets.yml, rotate passwords periodically
ansible-playbook deploy.yml -i inventory.ini -t docker -c local
```

---

## 📈 Performance & Optimization

### Run Tasks in Parallel

```bash
# Run up to 10 tasks concurrently (default is 5)
ansible-playbook deploy.yml -i inventory.ini -f 10 -c local
```

### Enable Fact Caching

```bash
export ANSIBLE_CACHE_PLUGIN=jsonfile
export ANSIBLE_CACHE_PLUGIN_CONNECTION=/tmp/ansible_cache
ansible-playbook deploy.yml -i inventory.ini -c local
```

---

## 📋 Customization

### Change Service Ports

Edit `vars/main.yml`:
```yaml
services:
  frontend:
    external_port: 8080  # Changed from 3000
  backend:
    external_port: 8081  # Changed from 2025
  mysql:
    external_port: 3308  # Changed from 3307
```

Then redeploy:
```bash
ansible-playbook deploy.yml -i inventory.ini -c local
```

### Change Docker Images

```yaml
docker_images:
  backend: deekshith1809/artgallery-backend:v2.0
  frontend: deekshith1809/artgallery-frontend:v2.0
  mysql: mysql:8.0
```

### Scale Kubernetes Replicas

```yaml
kubernetes:
  replica_count: 5  # Changed from 2
```

### Enable/Disable Monitoring

```yaml
enable_monitoring: true   # Set to false to skip Prometheus/Grafana
```

---

## 🐛 Troubleshooting

### Issue: Docker daemon not running
```bash
sudo systemctl start docker
sudo systemctl enable docker  # Auto-start on boot
```

### Issue: Connection refused on port
```bash
# Check if port is in use
lsof -i :3000
lsof -i :2025

# Kill process if needed (use cautiously)
kill -9 <PID>
```

### Issue: MySQL connection error
```bash
# Test database connection
docker exec artgallery-mysql mysql -u root -pDeekshith@123 -e "SELECT 1"
```

### Issue: Frontend can't reach backend
1. Check backend is running: `docker ps | grep backend`
2. Check CORS is configured (already done in code)
3. Verify URL in frontend: `http://localhost:2025`
4. Check firewall: `sudo ufw status`

### Issue: Kubernetes pods stuck in pending
```bash
# Check events
kubectl describe pod <pod-name> -n artgallery

# Check node resources
kubectl top nodes
kubectl top pods -n artgallery

# Check PVC status
kubectl get pvc -n artgallery
```

---

## 🔍 Monitoring & Health

### Quick Health Check

```bash
./healthcheck.sh
```

Output shows:
- ✓ Container/Pod status
- ✓ Port connectivity
- ✓ Service availability

### Detailed Status

**Docker:**
```bash
docker ps
docker inspect artgallery-backend
docker stats artgallery-backend
```

**Kubernetes:**
```bash
kubectl get all -n artgallery
kubectl describe pod <pod-name> -n artgallery
kubectl top pods -n artgallery
```

---

## 📚 Documentation Files

Read these for more details:
- **Quick Start**: `QUICKSTART.md` - 5-minute setup
- **Full Guide**: `README.md` - Comprehensive reference
- **Summary**: `DEPLOYMENT_SUMMARY.md` - Feature overview
- **This File**: `EXECUTION_GUIDE.md` - Practical instructions

---

## ✨ Advanced Features

### CI/CD Pipeline Integration

Example GitHub Actions workflow:
```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy with Ansible
        run: |
          pip install ansible
          ansible-playbook ansible/deploy.yml \
            -i ansible/inventory.ini \
            -c local
```

### Backup & Restore

```bash
# Backup MySQL database
docker exec artgallery-mysql mysqldump -u root -pDeekshith@123 ramanadb > backup.sql

# Restore from backup
docker exec -i artgallery-mysql mysql -u root -pDeekshith@123 ramanadb < backup.sql
```

### Monitor with Prometheus

After enabling monitoring:
```
Prometheus:  http://localhost:9090
Grafana:     http://localhost:3001 (admin/admin)
```

---

## 🎓 Learning Resources

- Ansible Documentation: https://docs.ansible.com/
- Docker Documentation: https://docs.docker.com/
- Kubernetes Documentation: https://kubernetes.io/docs/
- Spring Boot: https://spring.io/projects/spring-boot
- React: https://react.dev/

---

## 📞 Support & Next Steps

1. ✅ **Complete Setup** - Run `deploy.yml`
2. ✅ **Verify** - Run `verify_deployment.sh`
3. ✅ **Access App** - Open http://localhost:3000
4. ✅ **Monitor** - Run `healthcheck.sh`
5. ✅ **Scale** - Modify `vars/main.yml` and redeploy

---

## 🎉 Summary

You now have:
- ✅ Production-ready Ansible automation
- ✅ Support for Docker and Kubernetes
- ✅ Automated health checks and monitoring
- ✅ Easy rollback capability
- ✅ Comprehensive documentation
- ✅ Modular, reusable roles

**Ready to deploy?** Start with:
```bash
ansible-playbook deploy.yml -i inventory.ini -c local
```

---

Last Updated: November 28, 2025
