###############################################################################
# Stage 1.0: Image used to develop and build application
###############################################################################

FROM node:13-alpine as base

WORKDIR /opt/app

# -----------------------------------------------------------------------------
# Run preinstall scripts
# -----------------------------------------------------------------------------

COPY .dockerignore preinstal[l] preinstall/
RUN if npm run | grep -q preinstall ; then \
      npm run preinstall ; \ 
    fi

# -----------------------------------------------------------------------------
# Install dependencies
# -----------------------------------------------------------------------------

COPY package.json package-lock*.json yarn*.lock ./

RUN npm install --quiet && \
    npm cache clean --force
ENV PATH "/opt/app/node_modules/.bin:$PATH"
ENV NODE_PATH "/opt/app/node_modules/:$NODE_PATH"

# -----------------------------------------------------------------------------
# Run postinstall scripts
# -----------------------------------------------------------------------------

COPY .dockerignore postinstal[l] postinstall/
RUN if npm run | grep -q postinstall ; then \
      npm run postinstall ; \ 
    fi

# -----------------------------------------------------------------------------
# Copy source code to build
# -----------------------------------------------------------------------------

COPY . .

# -----------------------------------------------------------------------------
# Stop container from exiting (useful for debug on failures)
# -----------------------------------------------------------------------------

CMD tail -f /dev/null

###############################################################################
# Stage 1.1: Image ready to start development server
###############################################################################

FROM base as development

CMD ["npm", "start"]

###############################################################################
# Stage 1.2: Image that ready to build production bundle
###############################################################################

FROM base as builder

RUN npm run build

WORKDIR /opt/app/dist

RUN rm -rf /opt/app/dist/*; \
    cp -r /opt/app/build/* /opt/app/dist/;

# -----------------------------------------------------------------------------
# Export build to external volume mounted in docker-compose
# -----------------------------------------------------------------------------

CMD rm -rf /opt/app/dockerExport/*; \
    cp -r /opt/app/dist/* /opt/app/dockerExport/;

###############################################################################
# Stage 2: Image used to serve end application through http
###############################################################################

FROM nginx:alpine as production

# -----------------------------------------------------------------------------
# Configure nginx
# -----------------------------------------------------------------------------

COPY nginx.conf /etc/nginx/conf.d/default.conf

# -----------------------------------------------------------------------------
# Copy static build files
# -----------------------------------------------------------------------------

COPY --from=builder /opt/app/dist /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
