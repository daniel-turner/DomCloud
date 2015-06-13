function dom_traverse() {

  function add(name) {

    if(nameCounts.hasOwnProperty(name)) {

      nameCounts[name]++;

    } else {

      nameCounts[name] = 1;
    }
  }

  function traverse(root) {

    if(root.localName !== null) {

      add(root.localName);
    }

    if(root.nodeType === 1) {

      for(var i = 0;i<root.attributes.length;i++) {

        if(root.attributes[i].name !== null) {

          add(root.attributes[i].name);
        }
      }
    }

    if (root.firstChild !== null) {

      traverse(root.firstChild);
    }

    if(root.nextSibling !== null) {

      traverse(root.nextSibling);
    }
  };

  var nameCounts = {};

  var root = document.body.parentNode;

  traverse(root);

  //sort

  var hits = [];

  var names = Object.keys(nameCounts);

  for(var i = 0;i<names.length;i++) {

    hits.push(nameCounts[names[i]]);
  }

  hits = hits.sort(function(x,y) { return y-x;});

  //get highest 20

  var out = {};
  var index = -1;

  for(var i = 0;i<names.length;i++) {

    index = hits.indexOf(nameCounts[names[i]]);

    if(index > -1) {

      out[names[i]] = nameCounts[names[i]];
      hits.splice(index,1);
    }

    //console.log(Object.keys(out).length);
    //console.log(hits.length);

    if(Object.keys(out).length >= 20 || hits.length === 0) {

      i = names.length;
    }
  }

  console.log(out);

  return out;

};