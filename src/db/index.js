import Vue from 'vue'
import Dexie from 'dexie'

const db = new Dexie('qrdize')

db.version(0.1).stores({
  qrcodes: '++id,description,code,date,favorite',
  settings: '++id,name,value'
})

Vue.prototype.$db = db
