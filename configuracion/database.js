const {Sequelize} = require("sequelize");
const sequelize = new Sequelize('delilah resto',"root", "", {
    host: "localhost", 
    dialect: "mysql",
    logging: true,
    typeValidatiom: true
});

sequelize.sync({
    force: false
  });

const usuarioM = sequelize.define("usuario", {
    Id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      Password: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      Email: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      Telefono: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      direccion: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
}, { freezeTableName: true , timestamps: false}
);

const productoM = sequelize.define("producto", {
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: Sequelize.TEXT,
        allowNull: false

    },

    categoria: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['comida', 'bebida', 'postre']
    },

    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    }




}, { freezeTableName: true , timestamps: false}
);

const pedidoM = sequelize.define("pedido", {
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },

    metodoPago: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['efectivo', 'tarjeta'],
    },
    
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, { freezeTableName: true , timestamps: false}
);

const productopedidoM = sequelize.define("productopedido", {
    Id:{    
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },

    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    subtotal: {
       type: Sequelize.FLOAT,
       allowNull: false 
    }


}, { freezeTableName: true , timestamps: false}
);
    
pedidoM.belongsTo(usuarioM, {foreignKey: 'userID'});
pedidoM.belongsToMany(productoM, { through: productopedidoM });
productoM.belongsToMany(pedidoM, { through: productopedidoM });

module.exports = {
    sequelize,
    usuarioM,
    pedidoM,
    productoM,
    productopedidoM
};