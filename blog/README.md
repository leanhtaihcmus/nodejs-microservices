# Docker Some Basic Commands
- Build an image based on the dockerfile in the current directory. Tag it as 'abc/posts'
docker build -t kaydenle/posts .

- Create and start a container based on the provided image id or tag
docker run [image id or image tag]

- Create and start container, but also override the default command
docker run -it [image id or image tag] [cmd eg: sh]

- Print out information about all of the running containers
docker ps

- Execute the given command in a running container
docker exec -it [container id] [cmd eg: sh]

- Print out logs from the given container
docker logs [container id]

# Kubernetes Terminology
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