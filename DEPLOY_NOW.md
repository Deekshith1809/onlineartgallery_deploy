# 🚀 Fast Deployment Options

## Current Status
❌ Docker Desktop not running  
❌ Ansible not working on Windows (blocking IO issue)

## Option 1: Start Docker Desktop (Recommended)
```powershell
# Open Docker Desktop app manually, then run:
cd c:\oag(fsad)
docker-compose up -d

# Wait 30-60 seconds for services to start
docker-compose ps

# Access app:
# Frontend: http://localhost:3000
# Backend: http://localhost:2004
```

**Time:** 2-3 minutes

---

## Option 2: Use Kubernetes (If using Minikube)
```powershell
# Verify minikube is running
minikube status

# Apply manifests manually
kubectl apply -f artgalleryproj-fsad/frontend-deployment.yaml
kubectl apply -f SpringBootProjectBackend/backend-deployment.yaml

# Check status
kubectl get pods -n artgallery

# Access via NodePort
# Frontend: http://YOUR_MINIKUBE_IP:31577
# Backend: http://YOUR_MINIKUBE_IP:30855
```

**Time:** 1-2 minutes

---

## Option 3: Use WSL + Ansible (Best for Automation)
```bash
# From WSL terminal:
cd /mnt/c/oag\(fsad\)/ansible

# Install Ansible
pip install ansible -q

# Run deployment
ansible-playbook deploy.yml -i inventory.ini -c local

# Verify
./verify_deployment.sh
```

**Time:** 3-5 minutes

---

## What You Need to Do RIGHT NOW

### For Docker Compose:
1. **Open Docker Desktop app** (search for it in Start menu)
2. Wait for it to say "Docker is running"
3. Come back and run: `docker-compose up -d`

### For Kubernetes:
1. **Verify Minikube:** `minikube status`
2. **Verify kubectl:** `kubectl get nodes`
3. Then apply the manifests above

### For Ansible (Best):
1. **Use WSL** instead of PowerShell
2. Follow the WSL + Ansible option above

---

## Quick Test After Deployment

```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:2004/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"2300031766@kluniversity.in","password":"2300031766@kluniversity.in"}'

# Should return user data with userid: 1
```

---

## Status After Each Option

**Docker Compose:** ✅ Frontend + Backend + MySQL all running  
**Kubernetes:** ✅ Frontend + Backend + MySQL in K8s cluster  
**Ansible:** ✅ Fully automated, reproducible, version controlled

---

📌 **Next Step:** Start Docker Desktop now and report back!
