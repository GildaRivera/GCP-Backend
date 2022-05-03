FROM node
WORKDIR /GCP-BACKEND
COPY . .
RUN npm install
ENV MYSQL_HOST default
ENV MYSQL_USER default
ENV MYSQL_PASSWORD default
ENV MYSQL_DATABASE default   
ENV BUCKET_KEYFILE=default
ENV GCLOUD_PROJECT_ID=default
ENV BUCKET_NAME=default
EXPOSE 3001
CMD ["npm","start"]