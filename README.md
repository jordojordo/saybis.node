[![Build Tests](https://github.com/jordojordo/daphine/actions/workflows/test-build.yml/badge.svg?event=schedule)](https://github.com/jordojordo/daphine/actions/workflows/test-build.yml)

# Daphine

An api for streaming music and videos.

## Usage

Depending on your requirements you can run Daphine as a deployment in [Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), a [Podman](https://podman.io/docs#running-a-container) or [Docker](https://docs.docker.com/engine/reference/commandline/container/) container, or by simply running as a [Nodejs service](https://nodejs.org/dist/latest-v18.x/docs/api/synopsis.html) on your server. However, the setup for each requires a few different steps.

### Kubernetes deployment

Your Cluster will need to have a [PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) and [PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) for the data you wish to stream.

For instance:

```yml
## daphine.yml
---
# PersistentVolume which contains the data to be streamed
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
  labels:
    type: local
spec:
  capacity:
    storage: 20Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  hostPath:
    # Path of the data within the cluster
    path: "/mnt/assets"
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
                - local-node

---
# PersistentVolumeClaim spec
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: example-pv-claim
spec:
  storageClassName: local-storage
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi

---
# Deployment spec
apiVersion: apps/v1
kind: Deployment
metadata:
  name: daphine
spec:
  replicas: 3
  selector:
    matchLabels:
      app: daphine
  template:
    metadata:
      labels:
        app: daphine
    spec:
      nodeName: local-node
      containers:
        - name: daphine
          image: ghcr.io/jordojordo/daphine:latest
          ports:
            - containerPort: 3000
          env:
            # Frontend url
            - name: CORS_ORIGIN
              value: "https://example.com"
          imagePullPolicy: Always
          volumeMounts:
            # Mount the volume for the container
            - mountPath: "./assets"
              name: example-pv
      volumes:
        - name: example-pv
          persistentVolumeClaim:
            claimName: example-pv-claim
```

### Docker container

You can use the [latest release](https://github.com/jordojordo/daphine/pkgs/container/daphine) as your image to run, it only requires a few settings to run properly. A [Docker Volume](https://docs.docker.com/storage/volumes/) 

```console
docker run -d \
  --name daphine \
  -v <VOLUME_NAME>:/assets \
  ghcr.io/jordojordo/daphine:latest
```

### Nodejs service

The data you wish to stream will need to be accessible to the application and the paths will need to match within `./api/music.js` and `./api/stream.js`. For ease of use you can place the data in a directory titled "assets" within the root of the app.

Add the url of your frontend to the [`CORS_OPT.origin`](https://github.com/jordojordo/daphine/blob/30156b0c2523f938e98f34c516116a4de3100933/app.js#L18)

```console
npm install
npm run build
npm start
```