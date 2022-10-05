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