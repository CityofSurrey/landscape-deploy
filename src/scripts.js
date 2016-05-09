import Activity from './models/activity'
import Activities from './activities'

class Scripts {
  constructor(client) {
    this.client = client
    this.activities = new Activities(client)
  }

  query() {
    return new Promise(async (resolve) => {
      const scripts = await this.client.request('get-scripts')

      resolve(scripts.map(x => this.parse(x)))
    })
  }

  /**
   * Executes the Landscape script specified by id on all computers that belong
   * to a group specified by tag.
   *
   * @param {number} id - The id of the script stored on the Landscape server.
   * @param {string} tag - The group of severs on which the script should be executed.
   *
   * @returns {number} Id of created activity about this activity.
   */
  execute(id, tag) {
    return new Promise(async (resolve) => {
      const response = await this.client.request(`execute-script tag:${tag} ${id}`)
      const activity = new Activity(response)
      await this.activities.emitStatus(activity)

      resolve(activity)
    })
  }

  parse(script) {
    return {
      ...script,
    }
  }
}

export default Scripts
