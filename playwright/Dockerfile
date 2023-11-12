FROM node:latest

# Add playwright test source
COPY . .

RUN pwd

# Run tests
ENTRYPOINT ["/bin/sh"]
CMD ["entrypoint.sh"]