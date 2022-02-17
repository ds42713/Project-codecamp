module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Actor',{
        actorName: {
            type: DataTypes.STRING(200),
        },

    },{
        tableName: 'actor',
        underscored: true,
    }); 

    
    model.associate = models =>{
        model.belongsToMany(models.Movie,{
            through: models.Movie_actor,
            foreignkey: {
                name: 'actorId'
            }
        })
    };

    return model
}
