'use strict'

const dgram = require('dgram')
const IP = require('ip')
const notifier = require('node-notifier')

module.exports = class Chat {
  constructor ({ ip, port, subnetMask, username }) {
    this.ip = ip
    this.port = port
    this.username = username
    this.broadcastAddress = IP.subnet(ip, subnetMask).broadcastAddress
  }

  start (cb) {
    const server = dgram.createSocket('udp4')
    server.on('listening', () => {
      this.broadcast('online!')
    })
    server.on('error', cb)
    server.on('message', (msgInfo, rinfo) => {
      if (rinfo.address !== this.ip) {
        notifier.notify({ title: `From: ${msgInfo.username}`, message: msg });
        cb(null, JSON.parse(msgInfo.toString()))
      }
    })
    server.bind(this.port)

    const client = dgram.createSocket('udp4')
    client.bind(() => {
      client.setBroadcast(true)
    })

    this._client = client
    this._server = server
  }

  stop (cb) {
    this._server.close()
    this.broadcast('offline!', (err) => {
      this._client.close()
      cb && cb(err)
    })
  }

  broadcast (msg, cb) {
    msg = msg.trim()
    if (!msg) return cb && cb()

    const msgInfo = {
      username: this.username,
      msg
    }
    // const notification =notifier.notify({ title: `From: ${msgInfo.username}`, message: msg });
    this._client.send(JSON.stringify(msgInfo), this.port, this.broadcastAddress, cb)
  }
}
