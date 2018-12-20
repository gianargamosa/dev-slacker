## Dev Slacker

Dev Slacker is a messaging tool for development team.

**Note**: v3 use `tcp`, v4 use `udp`.

### Feature

```sh
Send message to fellow dev connected to the same network.
Send and receive notifications
```

### Install

```sh
$ npm i devslacker -g
```

### Usage

```sh
$ devslacker
```

Options:

```sh
  Usage: devslacker [options]


  Options:

    --port <port>              udp port, default: 1234
    --subnetMask <subnetMask>  subnetMask, default: '255.255.255.0'
    --username <username>      username, default use current user
    --indent <indent>          indent, default: 20 space
    -h, --help                 output usage information
```

### License

MIT
