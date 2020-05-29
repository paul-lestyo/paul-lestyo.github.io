var dbPromised = idb.open("football-data", 4, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("team", {
    keyPath: "id"
  });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("team", "readwrite");
      var store = tx.objectStore("team");
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        return store.getAll();
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}


function deleteById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("team", "readwrite");
        var store = tx.objectStore("team");
        return store.delete(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}