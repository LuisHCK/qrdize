import Vue from 'vue'
import Dexie from 'dexie'

const db = new Dexie('qrdize')

db.version(1).stores({
    qrcodes: '++id,description,code,date,favorite'
})

Vue.prototype.$db = db