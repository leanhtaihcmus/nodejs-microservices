# Docker Some Basic Commands
Build an image based on the dockerfile in the current directory. Tag it as 'abc/posts'
```
docker build -t kaydenle/posts .
```

Create and start a container based on the provided image id or tag
```
docker run [image id or image tag]
```

Create and start container, but also override the default command
```
docker run -it [image id or image tag] [cmd eg: sh]
```

Print out information about all of the running containers
```
docker ps
```

Execute the given command in a running container
```
docker exec -it [container id] [cmd eg: sh]
```

Print out logs from the given container
```
docker logs [container id]
```

# Kubernetes Terminology
## Basic definition
### Kubernetes Cluster
A collection of nodes + a master to manage them

### Node
A virtual machine that will run our containers

### Pod
More or less a running container. Technically, a pod can run mutiple containers (we won't do this)

### Deployment
Monitors a set of pods, make sure they are running an restarts them if they crash

### Service
Provides an easy-to-remember URL to access a running container

## Kubernetes Config Files
- Tell Kubernetes about the different Deployments, ods, and Services (referred to as 'Object') that we want to create.
- Written in YAML syntax.
- Always store these files with our project source code - they are documentation!
- We can create Objects without config files - do not do this. Config file provide a precise definition of that your cluster is running.
  - Kubernetes docs will tell you to run direct commands to create objects - only do this for testing purpose
  - Blogs post will tell you to run direct commands to create objects - close the blog post!

### ErrImagePull, ErrImageNeverPull and ImagePullBackoffErrors
If your pods are showing ErrImagePull, ErrImageNeverPull, or ImagePullBackoffErrors after running kubectl apply, the simplelest solution is to provide an imagePullPolicy to the pod.

First, run ```kubectl delete -f infra/k8s/```

Then, update your pod manifest:
```
spec:
  containers:
    - name: posts
      image: cygnet/posts:0.0.1
      imagePullPolicy: Never
```

Then, run ```kubectl apply -f infra/k8s/```

This will ensure that Kubernetes will use the image built locally from your image cache instead of attempting to pull from a registry.

### Minikube Users:
If you are using a vm driver, you will need to tell Kubernetes to use the Docker daemon running inside of the single node cluster instead of the host.

Run the following command:
```
eval $(minikube docker-env)
```

Note - This command will need to be repeated anytime you close and restart the terminal session.

Afterward, you can build your image:
```
docker build -t USERNAME/REPO .
```

Update, your pod manifest as shown above and then run:
```
kubectl apply -f infra/k8s/
```

See more at [https://minikube.sigs.k8s.io/docs/commands/docker-env/]

### Understanding a Pod Spec
```
apiVersion: v1
kind: Pod
metadata:
└───name: posts
spec:
└───containers:
    └─── - name: posts
    └───   image: kaydenle/posts:0.0.1
```

- apiVersion: K8s is extensible - we can add in our own custom objects. This specifies the set of objects we want K8s to look at. View more at [https://matthewpalmer.net/kubernetes-app-developer/articles/kubernetes-apiversion-definition-guide.html]
- kind: The type of object we want to create
- metadata: Config options for the object we are about to create
  - name: When the pod is created, give it a name of 'posts'
- spec: The exact attributes we want to apply to the object we are about to create
  - containers: We can create many containers in a single pod
    - name: Make a container with a name of 'posts
    - The exact image we want to use

### Common Kubectl Commands
Print out information about all of the running pods ```kubectl get pods```

Execute the given command in a running pods ```kubectl exec -it [pod_name] [cmd]```

Print out logs from the given pod ```kubectl logs [pod_name]```

Delete the given pod ```kubectl delete pod [pod_name]```

Tell kubernetes to process the config ```kubectl apply -f [config file name]```

Print out some information about the running pod ```kubectl describe pod [pod_name]```

### Setup Kubectl alias
In Terminal, run command ```code ~/.zshrc```

Add a new line bellow existing lines at file .zshrc
```
alias k="kubectl"
```
Back to Terminal and run ```source ~/.zshrc```

Quit old Terminal and new one, apply command to test ```k get pods```

### Common Commands Around Deployment
```kubectl get deployments``` List all the running deployments

```kubectl describe deployment [depl name]``` Print out details about a specific deployment

```kubectl apply -f [config file name]``` Create a deployment out of a config file

```kubectl delete deloyment [depl_name]``` Delete a deployment

```kubectl rollout restart deployment [depl_name]``` use to update deployment without change any configs

### Types of Services
#### Cluster IP
Sets up an easy -to-remember URL to access a pod. Only exposes pod in the cluster.
#### Node Port
Make a pod accessible from outside the cluster. Usually only used for dev purposes
#### Load Balancer
Makes a pod accessible from outside the cluster. This is the right way to expose a pod to the outside world
#### External Name
Redirects an in-cluster request to a CNAME url...don't worry about this one...

### Load Balancers and Ingress
#### Load Balancer Service
Tell Kubernetes to reach out to its provider and provision a load balancer. Gets traffic into a single pod.
#### Ingress or Ingress Controller
A pod with a set of routing rules to distribute traffic to other services.

### Ingress Nginx Installation Info
Install Ingress Nginx at [https://kubernetes.github.io/ingress-nginx/] (not Nginx Ingress, it's totally different and incompatible library for this exercise purpose).

Note - Windows students should be using Docker Desktop with WSL2 and not Minikube. The Minikube instructions provided below are intended for Linux users only.

Install Ingress Nginx tutorial [https://kubernetes.github.io/ingress-nginx/deploy/#quick-start]

#### Important Note About Port 80
Check have any conflicting running at port 80 by command ```sudo lsof -i tcp:80```

If Docker is properly listening on port 80 you should see something very similar:
```
COMMAND    PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
com.docke 7203 kayden  143u  IPv6 0xa7203f64e4616007      0t0  TCP *:http (LISTEN)
```
If something else is listed for TCP *:http, you'll need to shut that service down.

#### Note for new version of Ingress Nginx
```apiVersion: networking.k8s.io/v1beta1``` is deprecated

```
annotations:
  ingress.kubernetes.io/ingress.class: nginx
```
also deprecated and replace by the class name at spec:
```
spec:
  ingressClassName: nginx
```

Here's basic sample of Ingress Nginx version v1
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-myservicea
spec:
  ingressClassName: nginx
  rules:
  - host: myservicea.foo.org
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myservicea
            port:
              number: 80
```

#### Config Host File Location
We have to config local hosts file to "know" for example: posts.com is "posts.com of localhost" instead of "real posts.com at internet"

With window path is ```C:\Windows\System32\Drivers\etc\hosts```

With MacOS/ Linux path is ```/etc/hosts```

End of file add new line ```127.0.0.1 posts.com```