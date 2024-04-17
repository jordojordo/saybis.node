[![Build Tests](https://github.com/jordojordo/daphine/actions/workflows/test-build.yaml/badge.svg)](https://github.com/jordojordo/daphine/actions/workflows/test-build.yaml)

# Daphine

An api for streaming music and videos. See it in action on [yokanga.xyz](https://yokanga.xyz).

## Usage

> An example Vue app using this API can be found [here](https://github.com/jordojordo/yokanga.xyz).

Depending on your requirements you can run Daphine as a deployment in [Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), a [Podman](https://podman.io/docs#running-a-container) or [Docker](https://docs.docker.com/engine/reference/commandline/container/) container, or by simply running as a [Nodejs service](https://nodejs.org/dist/latest-v18.x/docs/api/synopsis.html) on your server. However, the setup for each requires a few different steps.

### Kubernetes deployment using Helm

Deploy Daphine easily in your Kubernetes cluster using Helm. First, add the Helm repository:

```console
helm repo add jordojordo https://jordojordo.github.io/helm-charts
```

Then, install Daphine using the Helm chart:

```console
helm install daphine jordojordo/daphine
```

For more details about the installation process, including prerequisites and how to configure the Helm chart, see the [Daphine Helm Chart README](https://github.com/jordojordo/helm-charts/tree/master/charts/daphine).

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
