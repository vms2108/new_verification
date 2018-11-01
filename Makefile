PROJECT_ID=api-project-206881048866
BUCKET=vdev.bonum.credit


all:
	ng build --prod
	gcloud config set project $(PROJECT_ID)
	gsutil -m rsync -a public-read -r -d dist gs://$(BUCKET)
