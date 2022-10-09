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
