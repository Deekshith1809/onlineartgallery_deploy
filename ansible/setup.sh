#!/bin/bash
# Ansible setup script for Art Gallery deployment

set -e

echo "Setting up Ansible environment for Art Gallery deployment..."

# Check if Ansible is installed
if ! command -v ansible &> /dev/null; then
    echo "Installing Ansible..."
    pip install ansible ansible-core jinja2
fi

# Check if kubectl is installed (for Kubernetes deployments)
if ! command -v kubectl &> /dev/null; then
    echo "Installing kubectl..."
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    chmod +x kubectl
    sudo mv kubectl /usr/local/bin/
fi

# Install required Ansible collections
echo "Installing required Ansible collections..."
ansible-galaxy collection install -r requirements.yml

# Create necessary directories
mkdir -p roles/{docker,database,backend,frontend,kubernetes,monitoring}/{tasks,templates,files,vars,defaults}
mkdir -p group_vars
mkdir -p host_vars

echo "Setting up vault for secrets..."
if [ ! -f vars/secrets.yml ]; then
    echo "Creating encrypted secrets file..."
    ansible-vault create vars/secrets.yml
fi

echo "Ansible setup completed successfully!"
echo ""
echo "To deploy the application, run:"
echo "  ansible-playbook deploy.yml -i inventory.ini"
echo ""
echo "For Kubernetes deployment:"
echo "  ansible-playbook deploy.yml -i inventory.ini -e deployment_platform=kubernetes"
echo ""
echo "To use vault-encrypted secrets:"
echo "  ansible-playbook deploy.yml -i inventory.ini --ask-vault-pass"
