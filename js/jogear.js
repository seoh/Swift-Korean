// Generated by CoffeeScript 1.7.1
(function() {
  var Node, colors, destory, draw, headers, init, nodeList, prev, root, topList, update,
    __slice = [].slice;

  headers = $('.bs-docs-container :header');

  Node = (function() {
    function Node(el) {
      this.children = [];
      if (el) {
        this.el = el;
        this.title = this.el.textContent.replace(/\([\w\s-]+\)$/, '');
        this.title = this.title.replace(/^\d+\.?\s/, '');
        this.level = parseInt(this.el.nodeName.slice(1));
      }
    }

    Node.prototype._add = function(node) {
      this.children.push(node);
      return node.parent = this;
    };

    Node.prototype.add = function(node) {
      if (this.level < node.level) {
        return this._add(node);
      } else {
        return this.parent.add(node);
      }
    };

    return Node;

  })();

  destory = function(node) {
    node.children.forEach(function(i, n) {
      return destory(n);
    });
    node.parent = null;
    return node.children = null;
  };

  root = {
    level: 0,
    children: [],
    add: function(node) {
      this.children.push(node);
      return node.parent = this;
    }
  };

  nodeList = [];

  prev = root;

  headers.each(function(i, header) {
    var curr;
    curr = new Node(header);
    nodeList.push(curr);
    prev.add(curr);
    return prev = curr;
  });

  topList = null;

  update = function(node) {
    var list, parent;
    list = [node];
    parent = node;
    while (!!(parent = parent.parent)) {
      list.push(parent);
    }
    list.pop();
    return draw.apply(null, list.reverse());
  };

  colors = ["#DCC6E0", "#AEA8D3", "#913D88", "#BF55EC", "#9A12B3", "#BE90D4", "#8E44AD", " #9B59B6"];

  draw = function() {
    var children, container, i, index, node, nodes, _i, _j, _len, _ref, _ref1, _results;
    nodes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    container = $('.bottom-line ul');
    children = container.children();
    for (index = _i = 0, _len = nodes.length; _i < _len; index = ++_i) {
      node = nodes[index];
      children[2 * index].textContent = node.title;
      children[2 * index].style.visibility = 'visible';
      children[2 * index + 1].style.visibility = 'visible';
      if (index < colors.length) {
        children[2 * index + 1].style.backgroundColor = colors[index + 1];
      }
    }
    children[2 * nodes.length - 1].style.backgroundColor = 'transparent';
    _results = [];
    for (i = _j = _ref = nodes.length * 2, _ref1 = children.length; _ref <= _ref1 ? _j < _ref1 : _j > _ref1; i = _ref <= _ref1 ? ++_j : --_j) {
      _results.push(children[i].style.visibility = 'hidden');
    }
    return _results;
  };

  this.scolling = false;

  $(window).on('scroll', function() {
    return this.scrolling = true;
  });

  setInterval(function() {
    var index, node, top, _i, _len;
    if (this.scrolling) {
      this.scrolling = false;
      for (index = _i = 0, _len = nodeList.length; _i < _len; index = ++_i) {
        node = nodeList[index];
        top = node.el.offsetTop;
        if (top > window.scrollY) {
          update(nodeList[index - 1]);
          break;
        }
      }
      return false;
    }
  }, 100);

  init = function() {
    var color, container, index, lis, ul, _i, _len;
    container = document.createElement('div');
    container.className = 'bottom-line';
    ul = document.createElement('ul');
    ul.style.backgroundColor = colors[0];
    container.appendChild(ul);
    for (index = _i = 0, _len = colors.length; _i < _len; index = ++_i) {
      color = colors[index];
      lis = [document.createElement('li'), document.createElement('li')];
      lis[0].style.backgroundColor = lis[1].style.borderLeftColor = color;
      if (index < colors.length) {
        lis[1].style.backgroundColor = colors[index + 1];
      }
      ul.appendChild(lis[0]);
      ul.appendChild(lis[1]);
    }
    return document.body.appendChild(container);
  };

  init();

}).call(this);
