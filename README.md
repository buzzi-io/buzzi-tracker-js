# buzzi-tracker-js
Site (Ecommerce) Tracking

### Copy Script into Browser

```html
<!-- Buzzi Tracking -->
<script>
window.buzzi=window.buzzi||function(){(buzzi.q=buzzi.q||[]).push(arguments)};buzzi.l=+new Date;
buzzi('init', /* YOUR BUZZI SITE ID HERE */);
</script>
<script async src='https://cdn.buzzi.io/tracking.min.js'></script>
<!-- End Buzzi Tracking -->
```

### Run demo

```bash
# Build Tracker JS Bundle
npm install
npm run build-demo

# Run Tracker Demo
cd ./demo
npm install
npm start
```

Open browser with http://127.0.0.1:3000
