const Sequelize = require('sequelize');
const SerializerError = require('./../common/errors/SerializerError');

class Serializer {
  constructor (model, attributes, associates) {
    this.model = model;
    this.attributes = attributes || {};
    this.associates = associates || {};
  }

  serialize (data, groups) {
    if (data instanceof Sequelize.Model) {
      data = data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((d) => this.serializeObject(d, groups));
    } else {
      return this.serializeObject(data, groups);
    }
  }

  serializeObject (data, groups) {
    const object = {};

    Object.keys(this.attributes).forEach((attrName) => {
      if (attrName in data) {
        const allowed = this.isAllowedAttribute(attrName, groups);

        if (allowed) {
          object[attrName] = data[attrName];
        }
      }
    });

    return object;
  }

  deserialize (data, groups, nullifyMissed = false) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        throw new SerializerError('Invalid JSON');
      }
    }

    if (Array.isArray(data)) {
      return data.map((d) => this.deserializeObject(d, groups, nullifyMissed));
    } else {
      return this.deserializeObject(data, groups, nullifyMissed);
    }
  }

  deserializeObject (data, groups, nullifyMissed = false) {
    const object = {};

    Object.keys(this.attributes).forEach((attrName) => {
      const allowed = this.isAllowedAttribute(attrName, groups);
      if (allowed) {
        let value;
        if (data === null || !(attrName in data)) {
          if (nullifyMissed) {
            const required = this.isRequiredAttribute(attrName, groups);
            if (required) {
              value = null;
            } else {
              value = this.getAttrDefaultValue(attrName);
            }
          } else {
            return;
          }
        } else {
          value = data[attrName];
        }

        if (typeof this.associates[attrName] === 'function') {
          const associateSerializer = this.associates[attrName].call(this);
          if (associateSerializer instanceof Serializer) {
            const association = this.model.associations[attrName];
            if (association.isSingleAssociation && Array.isArray(value)) {
              throw new SerializerError('Invalid JSON');
            }
            if (association.isMultiAssociation && !Array.isArray(value)) {
              throw new SerializerError('Invalid JSON');
            }
            object[attrName] = associateSerializer.deserialize(value, groups, nullifyMissed);
          }
        } else {
          object[attrName] = this.formatValue(attrName, value);
        }
      }
    });

    return object;
  }

  isAllowedAttribute (attrName, groups) {
    const attributes = Object.keys(this.attributes);

    if (!attributes.includes(attrName)) {
      return false;
    }

    const attrGroups = this.attributes[attrName];
    switch (typeof attrGroups) {
      case 'object':
        if (Array.isArray(attrGroups)) {
          return attrGroups.some((group) => {
            if (typeof group === 'object') {
              return Object.entries(group).some(([group,]) => {
                return groups.includes(group);
              });
            } else {
              return groups.includes(group);
            }
          });
        } else {
          return Object.entries(attrGroups).some((group) => {
            return groups.includes(group);
          });
        }
      case 'boolean':
        return attrGroups;
      case 'string':
        return groups.includes(attrGroups);
      case 'function':
        return attrGroups.call(this, groups);
      default:
        return false;
    }
  }

  isRequiredAttribute (attrName, groups) {
    const attributes = Object.keys(this.attributes);

    if (!attributes.includes(attrName)) {
      return false;
    }

    const attrGroups = this.attributes[attrName];
    switch (typeof attrGroups) {
      case 'object':
        if (Array.isArray(attrGroups)) {
          return attrGroups.some((group) => {
            if (typeof group === 'object') {
              return Object.entries(group).some(([group, required]) => {
                return groups.includes(group) && required;
              });
            } else {
              return groups.includes(group);
            }
          });
        } else {
          return Object.entries(attrGroups).some((group, required) => {
            return groups.includes(group) && required;
          });
        }
      case 'boolean':
        return attrGroups;
      case 'string':
        return groups.includes(attrGroups);
      default:
        return false;
    }
  }

  getAttrDefaultValue (attrName) {
    const attr = this.model.rawAttributes[attrName];

    return 'defaultValue' in attr ? attr.defaultValue : null;
  }

  formatValue (attrName, attrValue) {
    const field = this.model.rawAttributes[attrName];

    if (typeof attrValue === 'object' && attrValue !== null) {
      throw new SerializerError('Invalid JSON');
    }

    if (field) {
      switch (field.type.key) {
        case Sequelize.STRING.key:
        case Sequelize.TEXT.key:
          if (typeof attrValue !== 'string' && attrValue && attrValue.toString) {
            return attrValue.toString();
          }

          return attrValue;
        default:
          return attrValue;
      }
    } else {
      return attrValue;
    }
  }
}

module.exports = Serializer;
