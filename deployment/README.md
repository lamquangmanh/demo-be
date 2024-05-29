### How to deploy app nodeJS to google cloud using kubenetes and autopilot

Deploying a Node.js application to Google Cloud using Kubernetes Engine Autopilot involves a few steps. Here's a high-level overview:

1. **Containerize your Node.js application**: You need to create a Docker container for your Node.js application. This involves writing a Dockerfile that specifies how to build your application into a container image.

2. **Push container image to Container Registry**: Once you have the Docker image, you need to push it to Google Container Registry (GCR) or another container registry that Kubernetes Engine can access.

3. **Set up Kubernetes Engine Autopilot**: Go to the Google Cloud Console and create a new Kubernetes cluster. Choose "Autopilot" as the cluster type.

4. **Deploy your application**: Once your cluster is set up, deploy your Node.js application to the cluster. This involves creating Kubernetes deployment and service YAML files.

5. **Expose your service**: If your Node.js application needs to be accessible from outside the cluster, you'll need to expose it using a Kubernetes Service of type LoadBalancer or NodePort.

6. **Test your deployment**: Once your application is deployed, test it to ensure it's working as expected.

Here's a more detailed breakdown:

### 1. Containerize your Node.js application
Create a Dockerfile in the root of your Node.js application directory. Here's a simple example:

```Dockerfile
FROM node:18.17

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run build source from typescript to javascript
RUN npm run build

# expose port the application using
EXPOSE 3000

# Run application
# CMD ["node", "app.js"]
CMD ["npm run start:prod"]
```

### 2. Push container image to Container Registry
Build your Docker image and push it to Google Container Registry:

```bash
# Build Docker image
docker build -t gcr.io/PROJECT_ID/your-app-name:v1 .

# Push Docker image to Container Registry
docker push gcr.io/PROJECT_ID/your-app-name:v1

```

Replace `PROJECT_ID` with your Google Cloud project ID.
`PROJECT_ID` is id of environment such as DEV, TEST, STAG, PROD

If docker push command return an error:  Unauthenticated request. Unauthenticated requests do not have permission "artifactregistry.repositories.uploadArtifacts" on resource. You need to add permission of upload Artifact before that.

### 3. Set up Kubernetes Engine Autopilot
In the Google Cloud Console, navigate to Kubernetes Engine and create a new cluster. Choose "Autopilot" as the cluster type and follow the prompts to set up your cluster.
Just setup only one time. In next deployment, no need to setup again.
```bash
1. Go to Kubenetes Engine page -> Open Clusters in menu
Create cluster with mode autopilot and waiting until cluster created successfully.

2. Open terminal in local and run bellow command:
gcloud container clusters get-credentials cluster-name --region asia-east1 --project dev-env-424102
```

### 4. Deploy your application
Create a Kubernetes deployment YAML file (`deployment.yaml`) to deploy your application:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app-deployment
spec:
  replicas: 3 # it's mean: 3 pods
  selector:
    matchLabels:
      app: your-app
  template:
    metadata:
      labels:
        app: your-app
    spec:
      containers:
        - name: your-app
          image: gcr.io/PROJECT_ID/your-app-name:v1
          ports:
            - containerPort: 3000
      resources:
        requests:
          cpu: "1gb"
          memory: "1gb"
        limits:
          cpu: "2gb"
          memory: "2gb"
```

Apply the deployment:

```bash
kubectl apply -f deployment.yaml
```

### 5. Expose your service
Create a Kubernetes service YAML file (`service.yaml`) to expose your application:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: your-app-service
spec:
  type: LoadBalancer # or NodePort
  selector:
    app: your-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

Apply the service:

```bash
kubectl apply -f service.yaml
```

### 6. Test your deployment
Once your application is deployed, you can test it by accessing the external IP address of your service.

That's it! Your Node.js application should now be deployed to Google Cloud using Kubernetes Engine Autopilot.

### How to setup google autopilot scale 3 pods and 3 node in every pod

To set up Google Kubernetes Engine (GKE) Autopilot to scale to 3 pods with 3 nodes in every pod, you'll need to configure your Autopilot cluster and define your pod specifications accordingly. Here's how you can achieve this:

1. **Create a Kubernetes deployment YAML file**: Define your deployment with the desired number of replicas (pods) and specify resource requests and limits.

2. **Configure Autopilot**: Set up Autopilot configuration to handle scaling automatically based on the defined resource requests and limits.

3. **Specify node pool specifications**: Since Autopilot manages the underlying infrastructure for you, you won't directly specify the number of nodes. However, you can indirectly control the number of nodes by specifying the resource requests and limits in your pod specifications.

Here's a step-by-step guide:

### 1. Create a Kubernetes deployment YAML file
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: your-app
  template:
    metadata:
      labels:
        app: your-app
    spec:
      containers:
      - name: your-app
        image: gcr.io/PROJECT_ID/your-app-name:v1
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: "250m"
            memory: "64Mi"
          limits:
            cpu: "500m"
            memory: "128Mi"
```
Replace `PROJECT_ID` with your Google Cloud project ID.

### 2. Configure Autopilot
When creating or updating your Autopilot cluster, ensure that you specify appropriate configurations for autoscaling. Autopilot will automatically manage the scaling of the cluster based on the resource requests and limits specified in your pod configurations.

### 3. Specify node pool specifications
Since Autopilot manages the underlying infrastructure for you, you won't specify the number of nodes directly. However, by setting resource requests and limits in your pod specifications, you indirectly influence the number of nodes.

In the example YAML file above, the resource requests and limits are set for CPU and memory. These specifications will influence the number of nodes provisioned by Autopilot to meet the resource requirements of your pods.

Once you've set up your deployment YAML file, configured Autopilot, and specified pod resource requests and limits, Autopilot will manage the scaling of your cluster automatically to ensure that your pods have the necessary resources available.