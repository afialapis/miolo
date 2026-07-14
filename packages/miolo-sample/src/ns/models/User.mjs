import { MioloModel } from "miolo-model"

export default class User extends MioloModel {
  /**
   * Get the id of the user.
   * @returns {number} The id of the user.
   * @public
   */  
  get id() {
    return this.get_value("id")
  }

  /**
   * Get the username of the user.
   * @returns {string|undefined} The username of the user.
   * @public
   */    
  get username() {
    return this.get_value("username")
  }

  /**
   * Get the password of the user.
   * @returns {string|undefined} The password of the user.
   * @public
   */    
  get password() {
    return this.get_value("password")
  }

  /**
   * Get the name of the user.
   * @returns {string|undefined} The name of the user.
   * @public
   */    
  get name() {
    return this.get_value("name")
  }

  /**
   * Get the email of the user.
   * @returns {string|undefined} The email of the user.
   * @public
   */    
  get email() {
    return this.get_value("email")
  }

  /**
   * Get the active status of the user.
   * @returns {boolean|undefined} The active status of the user.
   * @public
   */    
  get active() {
    return this.get_value("active")
  }

  /**
   * Get the last login date of the user.
   * @returns {number|undefined} The last login date of the user.
   * @public
   */    
  get lastLoginDate() {
    return this.get_value("last_login_date")
  }

  /**
   * Get the last login IP of the user.
   * @returns {string|undefined} The last login IP of the user.
   * @public
   */    
  get lastLoginIp() {
    return this.get_value("last_login_ip")
  }

  /**
   * Get the login count of the user.
   * @returns {number} The login count of the user.
   * @public
   */  
  get loginCount() {
    return this.get_value("login_count", 0)
  }

  /**
   * Get the last connection date of the user.
   * @returns {number|undefined} The last connection date of the user.
   * @public
   */    
  get lastConnAt() {
    return this.get_value("last_conn_at")
  }

  /**
   * Get the creation date of the user.
   * @returns {number|undefined} The creation date of the user.
   * @public
   */      
  get createdAt() {
    return this.get_value("created_at")
  }

  /**
   * Get the last update date of the user.
   * @returns {number|undefined} The last update date of the user.
   * @public
   */    
  get lastUpdateAt() {
    return this.get_value("last_update_at")
  }
}
