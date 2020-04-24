###############################################################################
# Stage 1.0: Image with common app dependencies installed
###############################################################################

FROM node:12-alpine as base

# -----------------------------------------------------------------------------
# Install dependencies
# -----------------------------------------------------------------------------

WORKDIR /opt

COPY --chown=node:node package.json package-lock*.json ./
RUN npm i --quiet --only=production && \
  npm cache clean --force

ENV PATH "/opt/node_modules/.bin:$PATH"
ENV NODE_PATH "/opt/node_modules/:$NODE_PATH"

###############################################################################
# Stage 2.0: Image ready for development with live reload
###############################################################################

FROM base as development

ENV NODE_ENV "development"

WORKDIR /opt
RUN npm i --quiet --only=development

WORKDIR /opt/app

# -----------------------------------------------------------------------------
# We do not copy code into this image
# because you will anyways mount local folders for the development
# -----------------------------------------------------------------------------

CMD ["npm", "run", "dev"]

###############################################################################
# Stage 3.0: Image with copied source files
###############################################################################

FROM base as source

COPY --chown=node:node . .

###############################################################################
# Stage 4.0: Image ready to run tests
###############################################################################

FROM source as test

ENV NODE_ENV "development"

COPY --from=development /opt/node_modules /opt/node_modules

CMD ["npm", "run", "test"]

###############################################################################
# Stage 5.0: Image ready for deployment of production app
###############################################################################

FROM source as production

ENV NODE_ENV "production"

RUN apk add --no-cache tini

USER node

# -----------------------------------------------------------------------------
# Start app with tiny to catch SIGTERM and other signals properly
# -----------------------------------------------------------------------------

ENTRYPOINT ["tini", "--"]
CMD ["node", "index.js"]
