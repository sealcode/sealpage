![Sealpage logo](assets/sealpage-logo.svg)

# Sealpage

The Sealious-powered content management system that renders the site to the static files.

## New website project setup

To use Sealpage, which is just a tool, you'll need another NodeJS project where the Sealious collections and so on are configured. At the moment it is advisable you follow [Midline](https://hub.sealcode.org/source/midline-blog).

In new website project directory run:

```
npm ci
npm i sealcode/sealpage --save
```

### Linking Sealpage for development

To develop Sealpage itself, you'll have to add it in a different way, so that you use the latest Sealpage codebase.

In Sealpage directory run:

```
npm link .
```

In new website project directory run:

```
npm ci
npm link sealpage
```

## Day-to-day development

During this you'll be rather interested in working with new website project.

Remember to turn the database on:

```
docker-compose up -d
```

To build, run:

```
sealpage build
```

To enable admin dashboard, run:

```
sealpage admin
```

Note that both `build` and `admin` take arguments, so that site dir structure is more customizable.

To learn more about it simply type:

```
sealpage --help
```
