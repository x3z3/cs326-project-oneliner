export async function saveEntry(username, content, collection) {
  // create new document
  let newEntry = {
    username: username,
    content: content
  }

  // query the collection for an existing document at current date (catch and log promise error)
  if (await entryExists(username, collection)) {
    // no entry found, create new document
    await createEntry(newEntry, collection);
  } else { 
    // entry found, update document with new data
    await updateEntry(username, newEntry, collection);
  }
}

export async function deleteEntry(username, collection) {
  if (entryExists(username, collection)) {
    await collection.deleteOne({'date': date}).catch(err => console.log(err));
  } else {
    console.log('Deletion error, entry does not exist');
  }
}

export async function fetchContent(username, collection) {
  let curEntry = await collection.findOne({'username': username}).catch(err => console.log(err));
  return curEntry ? curEntry.content : '';
}

async function createEntry(newEntry, collection) {
  // try to insert to collection
  await collection.insertOne(newEntry).catch(err => console.log(err));
}

async function updateEntry(username, newEntry, collection) {
  // try to replace document
  await collection.replaceOne({'username': username}, newEntry).catch(err => console.log(err));
}

async function entryExists(username, collection) {
  let curEntry = await collection.findOne({'username': username}).catch(err => console.log(err));
  return (curEntry === null);
}