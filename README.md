## Automated Test

A Node.js test checks that the app's HTML, CSS, and JavaScript files exist and that the HTML contains an `<html>` element.

Run the test locally:

```bash
node tests/test-app.js
## Kubernetes Deployment

The application is deployed locally to Kubernetes using Docker Desktop.

- Namespace: `css-playground`
- Deployment: `css-playground`
- Replicas: 2
- Service: `css-playground-service` (NodePort)
- Verified: both pods are running and the deployment rollout completed.
- Tested access using port-forwarding at `http://localhost:8081`.

The Ingress resource has been applied, but hostname routing is not configured yet because an Ingress controller is not installed.