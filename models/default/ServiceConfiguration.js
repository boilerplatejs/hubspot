import {parse, define, Model, DataTypes} from '@boilerplatejs/core/lib/Sequelize';

/**
 * Model/Table Definition
 *
 * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html
 * 
 * Defines the model (and table) name from this filename.
 * NOTE: Overriding this line is discouraged (but shouldn't break anything.)
 */
@define(parse(__filename))

export default class extends Model {
    /**
     * Model Attributes
     *
     * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types
     *
     * Examples:
     *
     * id = { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true };
     * name = DataTypes.STRING;
     */

    // Define attrbutes here:


    /**
     * Model Descriptors
     *
     * @see http://docs.sequelizejs.com/manual/tutorial/associations.html
     *
     * Examples:
     *
     * static associate = function(models) {
     *     this.belongsTo(models.MyBundleModel); // Create a `MyBundleModelId` column with foreign key association
     * };
     *
     * static tableName = parse(__filename); // Use filename as the literal table name
     */

    // Define descriptors here:

}