Steps to running via docker:

Open up a terminal, navigate to this directory and run

```
docker build -t web_api .
docker compose up
```

Run the migration commands via the package manager console

```
Update-Database -Context RealEstateContext
Update-Database -Context RealEstateIdentityContext
```
