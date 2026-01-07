# Art Gallery Application - Ansible Automation

This directory contains comprehensive Ansible playbooks and roles for automating the deployment of the Art Gallery application across Docker and Kubernetes environments.

## Directory Structure

```
ansible/
├── deploy.yml                 # Main playbook
├── inventory.ini             # Inventory configuration
├── requirements.yml          # Ansible collections
├── setup.sh                  # Setup script
├── README.md                 # This file
├── vars/
│   ├── main.yml             # Main variables
│   └── secrets.yml          # Sensitive variables (vault-encrypted)
├── roles/
│   ├── docker/              # Docker installation and setup
│   ├── database/            # MySQL deployment
│   ├── backend/             # Backend service deployment
│   ├── frontend/            # Frontend service deployment
│   ├── kubernetes/          # Kubernetes deployment
│   └── monitoring/          # Prometheus & Grafana setup
├── group_vars/              # Group-level variables
├── host_vars/               # Host-specific variables
└── templates/               # Configuration templates
```

## Prerequisites

- **Ansible 2.9+** installed on the control machine
- **Python 3.6+** with `jinja2` package
- For Docker deployment: Docker and Docker Compose installed on target machines
- For Kubernetes: `kubectl` configured and cluster access available
- SSH access to target machines (for remote deployments)

## Installation

### 1. Clone the repository

```bash
cd c:\oag(fsad)\ansible
```

### 2. Run the setup script

```bash
chmod +x setup.sh
./setup.sh
```

This will:
- Install Ansible and dependencies
- Install kubectl (if deploying to Kubernetes)
- Install required Ansible collections
- Initialize vault for secrets management

### 3. Configure secrets

Edit the secrets file with your credentials:

```bash
ansible-vault create vars/secrets.yml
```

Add the following content:

```yaml
---
docker_username: your_docker_username
docker_password: your_docker_password
mysql_root_password: your_mysql_root_password
mysql_user: your_mysql_user
mysql_password: your_mysql_password
```

### 4. Update inventory

Edit `inventory.ini` to match your environment:

```ini
[artgallery_servers]
your_server_ip_or_hostname

[artgallery_servers:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

## Configuration

### Main Variables (`vars/main.yml`)

Key configuration options:

```yaml
# Deployment platform
deployment_platform: docker  # Options: docker, kubernetes

# Container registry
docker_registry: docker.io
docker_images:
  backend: deekshith1809/artgallery-backend:latest
  frontend: deekshith1809/artgallery-frontend:latest
  mysql: mysql:8

# Service ports
services:
  mysql:
    external_port: 3307
  backend:
    external_port: 2025
  frontend:
    external_port: 3000

# Kubernetes settings
kubernetes:
  namespace: artgallery
  replica_count: 2
  resource_limits:
    backend:
      cpu: "500m"
      memory: "1Gi"
    frontend:
      cpu: "250m"
      memory: "512Mi"
    mysql:
      cpu: "1000m"
      memory: "2Gi"
```

## Usage

### Docker Deployment

Deploy the entire application to Docker:

```bash
ansible-playbook deploy.yml -i inventory.ini
```

With vault-encrypted secrets:

```bash
ansible-playbook deploy.yml -i inventory.ini --ask-vault-pass
```

Deploy only specific roles (tags):

```bash
# Only database
ansible-playbook deploy.yml -i inventory.ini -t database

# Only backend
ansible-playbook deploy.yml -i inventory.ini -t backend

# Only frontend
ansible-playbook deploy.yml -i inventory.ini -t frontend

# Skip monitoring
ansible-playbook deploy.yml -i inventory.ini --skip-tags monitoring
```

### Kubernetes Deployment

Deploy to Kubernetes cluster:

```bash
ansible-playbook deploy.yml -i inventory.ini \
  -e deployment_platform=kubernetes \
  --ask-vault-pass
```

Monitor deployment:

```bash
kubectl get pods -n artgallery -w
kubectl describe pod -n artgallery <pod_name>
kubectl logs -n artgallery <pod_name> -f
```

### Health Checks

Verify the deployment:

```bash
# Docker: Check container status
docker ps | grep artgallery

# Docker: View logs
docker logs artgallery-backend
docker logs artgallery-frontend

# Kubernetes: Check pod status
kubectl get pods -n artgallery
kubectl get svc -n artgallery
```

### Access the Application

**Docker Deployment:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:2025
- MySQL: localhost:3307

**Kubernetes Deployment:**
- Frontend: http://<node_ip>:31577
- Backend API: http://<node_ip>:30855
- MySQL: accessible via service `mysql-service:3306`

## Troubleshooting

### Issue: Vault password required but not provided

```bash
ansible-playbook deploy.yml -i inventory.ini --ask-vault-pass
```

### Issue: Docker daemon not running

```bash
# Linux
sudo systemctl start docker

# macOS
open /Applications/Docker.app
```

### Issue: Kubernetes connection refused

```bash
# Verify kubeconfig
kubectl cluster-info
kubectl get nodes

# Update kubeconfig path in inventory.ini
kubeconfig_path: ~/.kube/config
```

### Issue: Container healthcheck failing

```bash
# Check logs
docker logs artgallery-backend
docker logs artgallery-frontend

# Restart container
docker restart artgallery-backend
ansible-playbook deploy.yml -i inventory.ini -t backend
```

## Advanced Usage

### Custom Variables

Create host-specific or group-specific variables:

```bash
# For specific host
cat > host_vars/your_server_ip.yml <<EOF
deployment_env: staging
enable_monitoring: true
EOF

# For group of hosts
cat > group_vars/artgallery_servers.yml <<EOF
backend_replicas: 3
EOF
```

### Dry Run (Check Mode)

Preview changes without applying them:

```bash
ansible-playbook deploy.yml -i inventory.ini --check
```

### Verbose Output

Debug deployment issues:

```bash
ansible-playbook deploy.yml -i inventory.ini -vv
# or -vvv for maximum verbosity
```

### Limit Deployment

Deploy to specific hosts:

```bash
ansible-playbook deploy.yml -i inventory.ini -l specific_host
```

## Maintenance

### Backup Database

```bash
# Docker
docker exec artgallery-mysql mysqldump -u root -p<password> \
  ramanadb > backup_$(date +%Y%m%d_%H%M%S).sql

# Kubernetes
kubectl exec -n artgallery deployment/mysql-deployment -- \
  mysqldump -u root -p<password> ramanadb > backup.sql
```

### Update Container Images

```bash
# Update vars/main.yml with new image versions
docker_images:
  backend: deekshith1809/artgallery-backend:v2.0
  frontend: deekshith1809/artgallery-frontend:v2.0

# Redeploy
ansible-playbook deploy.yml -i inventory.ini -t docker,backend,frontend
```

### Scale Kubernetes Deployment

```bash
# Update vars/main.yml
kubernetes:
  replica_count: 5

# Apply
ansible-playbook deploy.yml -i inventory.ini -e deployment_platform=kubernetes -t kubernetes
```

## Security Best Practices

1. **Always encrypt secrets:**
   ```bash
   ansible-vault encrypt vars/secrets.yml
   ```

2. **Use SSH keys instead of passwords:**
   ```ini
   [artgallery_servers]
   host ansible_ssh_private_key_file=~/.ssh/id_rsa
   ```

3. **Restrict file permissions:**
   ```bash
   chmod 600 vars/secrets.yml
   chmod 600 ~/.vault_pass
   ```

4. **Use firewall rules to restrict access:**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 3000  # frontend
   sudo ufw allow 2004  # backend
   sudo ufw allow 3307  # mysql
   ```

## Performance Optimization

### Parallel Execution

```bash
# Run tasks in parallel (default: 5)
ansible-playbook deploy.yml -i inventory.ini -f 10
```

### Caching

```bash
# Enable fact caching
export ANSIBLE_CACHE_PLUGIN=jsonfile
export ANSIBLE_CACHE_PLUGIN_CONNECTION=/tmp/ansible_facts_cache
ansible-playbook deploy.yml -i inventory.ini
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy with Ansible
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Ansible
        run: pip install ansible
      - name: Deploy
        run: |
          ansible-playbook ansible/deploy.yml \
            -i ansible/inventory.ini \
            --vault-password-file ${{ secrets.VAULT_PASSWORD }}
```

## Contributing

To add new roles or modify existing ones:

1. Create role structure: `roles/new_role/{tasks,templates,files,vars,defaults}`
2. Add tasks in `roles/new_role/tasks/main.yml`
3. Include role in `deploy.yml`
4. Test: `ansible-playbook deploy.yml --check -t new_role`

## Support

For issues and questions:
- Check the troubleshooting section above
- Review Ansible documentation: https://docs.ansible.com/
- Check role documentation in respective directories

## License

This Ansible automation is part of the Art Gallery project.
