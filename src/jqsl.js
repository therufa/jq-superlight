;(function (root, factory) {
  // eslint-disable-next-line no-undef
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    // eslint-disable-next-line no-undef
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals
    var jqsl = factory()
    root.$ = jqsl
    root.jqsl = jqsl
  }
// eslint-disable-next-line no-undef
})(typeof self !== 'undefined' ? self : this, function ($) {
  function Jqsl (selector) {
    this._selector = selector

    try {
      this.matches = document.querySelectorAll(selector)
    } catch (e) {
      this.matches = toHtml(selector)
    }  

    return bindToCtx(this.toArray(), this)
  }

  function isString (val) {
    return Object.prototype.toString.apply(val) === '[object String]'
  }

  function toHtml (html) {
    var template = document.createElement('template')
    template.innerHTML = html

    return template.content.childNodes
  }

  function bindToCtx (matches, ctx) {
    matches.forEach(function (match, idx) {
      ctx[idx] = match
    })
  }

  function bindEventHandler (ctx, evt, handler) {
    ctx._handlers = ctx._handlers || {}
    var handlers = ctx._handlers[evt] || []

    handlers.push(handler)

    ctx._handlers[evt] = handlers
  }

  function getEventHandler (ctx, evt) {
    try {
      return ctx._handlers[evt]
    } catch (e) {
      return []
    }
  }

  Jqsl.prototype.get = function (pos) {
    return this.toArray().slice(pos, 1).pop()
  }

  Jqsl.prototype.on = function (event, handler) {
    this.matches.forEach(function (item) {
      bindEventHandler(item, event, handler)
      item.addEventListener(event, handler)
    })
  }

  Jqsl.prototype.off = function (event) {
    this.each(function (item) {
      getEventHandler(item, event).forEach(function (handler) {
        item.removeEventListener(event, handler)
      })
    })
  }

  Jqsl.prototype.trigger = function (evtName) {
    this.each(function (item) {
      var event = document.createEvent('HTMLEvents')
      event.initEvent(evtName, true, true)
      item.dispatchEvent(event)
    })
  }

  Jqsl.prototype.map = function (cb) {
    return this.matches.map(cb)
  }

  Jqsl.prototype.each = function (cb) {
    return this.matches.forEach(cb)
  }

  Jqsl.prototype.toArray = function () {
    var res = []

    for (var i = 0; i < this.matches.length; i++) {
      res.push(this.matches[i])
    }

    return res
  }

  Jqsl.prototype.slice = function (from, to) {
    return this.toArray().slice(from, to)
  }

  Jqsl.prototype.html = function (content) {
    this.each(function (item) {
      item.innerHTML = content
    })
  }

  Jqsl.prototype.append = function (item) {
    var target = item.get ? item.get() : item

    this.get().appendChild(target)
  }

  Jqsl.prototype.appendTo = function (target) {
    var ctx = target.get ? target.get() : target

    if (isString(ctx)) {
      ctx = factory(ctx).get()
    }

    ctx.appendChild(this.get())
  }

  Jqsl.prototype.remove = function () {
    this.each(function (item) {
      item.remove()
    })
  }

  function factory (selector) {
    return new Jqsl(selector)
  }

  return factory
})
