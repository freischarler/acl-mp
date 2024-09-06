'use strict';
const { v4: uuidv4 } = require('uuid');
const { hash } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      team_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      colors: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      webpage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });

    await queryInterface.createTable('genders', {
      gender_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'genders',
          key: 'gender_id',
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'team_id',
        },
      },
      born: {
        type: Sequelize.DATE,
        allowNull: false
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });

    await queryInterface.createTable('categories', {
      category_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
    });

    await queryInterface.createTable('athlete_categories', {
      athlete_categories_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      athlete_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.createTable('styles', {
      style_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('weights', {
      weight_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    
    await queryInterface.createTable('ages', {
      age_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      min_age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      max_age: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.createTable('events', {
      event_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      style_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'styles',
          key: 'style_id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      weighing_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      type: { // Tournament, Seminar, Workshop, etc
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      }
    });

    await queryInterface.createTable('event_prices', {
      price_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valid_from: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valid_to: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('tickets', {
      ticket_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      purchase_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'active',
      },
    });

    await queryInterface.createTable('qr_codes', {
      qr_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      ticket_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tickets',
          key: 'ticket_id',
        },
      },
      qr_code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });

    await queryInterface.createTable('registrations', {
      registration_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      gender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'genders',
          key: 'gender_id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
      },
      weight_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'weights',
          key: 'weight_id',
        },
      },
      age_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ages',
          key: 'age_id',
        },
      },
      style_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'styles',
          key: 'style_id',
        },
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'pending',
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('event_parameters', {
      event_parameters_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      gender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'genders',
          key: 'gender_id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      weight_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'weights',
          key: 'weight_id',
        },
      },
      age_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ages',
          key: 'age_id',
        },
      },
    });

    await seedDatabase(queryInterface);
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('qr_codes');
    await queryInterface.dropTable('tickets');
    await queryInterface.dropTable('events');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('event_prices');
  }
};


async function seedDatabase(queryInterface) {
  // DUMMY DATA
    await queryInterface.bulkInsert('genders', [
      {
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        value: 'Masculine'
      },
      {
        gender_id: 'aa0e22c7-8d83-41d5-a6c2-150cdbbf1b7f',
        value: 'Feminine'
      }
    ]),

    await queryInterface.bulkInsert('categories', [
      {
        category_id: 'a594ac40-d362-441e-8fb8-f64460084c19',
        name: 'Profesional',
      },
      {
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        name: 'Amateur',
      }
    ]);

    await queryInterface.bulkInsert('teams', [
      {
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        name: 'Athlètes Individuels Neutres',
        country: 'France',
        city: 'Paris',
        address: 'N/A',
        phone: 'N/A',
        colors: 'green, white',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Individual_Neutral_Athletes_at_the_2024_Summer_Olympics_Flag.svg/220px-Individual_Neutral_Athletes_at_the_2024_Summer_Olympics_Flag.svg.png',
        webpage: 'https://en.wikipedia.org/wiki/Individual_Neutral_Athletes_at_the_2024_Summer_Olympics',
        description: 'Individual Neutral Athletes (Russian: Индивидуальные нейтральные спортсмены, Belarusian: Індывідуальныя нейтральныя спартсмены) is the name used to represent approved Russian and Belarusian athletes at the 2024 Summer Olympics, after the International Olympic Committee (IOC) banned the nations previous designations due to the Russian invasion of Ukraine in 2022. The IOC country code is AIN, after the French name Athlètes Individuels Neutres.[1]. The delegation is banned from using the neutral Olympic flag and Olympic anthem, and will instead use a flag depicting a circular AIN emblem and a one-off instrumental anthem, both assigned by the IOC.[2] Individual neutral athletes must be approved by each sports international federation, but an international federation has the discretion not to approve any athletes in their sport.[3] As individual athletes, the delegation will not take part in the parade of nations during the opening ceremony, nor be listed as a delegation on official medal tables.     While the flag uses the singular wording "Individual Neutral Athlete", the IOC uses the plural wording "Individual Neutral Athletes" in prose. '
      },
      {
        team_id: uuidv4(),
        name: 'Team 1',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        colors: 'red, white',
        image_url: 'https://via.placeholder.com/150',
        webpage: 'https://team1.com',
        description: 'This is a description of team 1',
      },
      {
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        name: 'CAE',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        colors: 'blue, white',
        image_url: 'https://via.placeholder.com/150',
        webpage: 'https://team2.com',
        description: 'This is a description of team 2',
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        user_id: uuidv4(),
        name: 'Martin',
        country: 'Arg',
        city: 'Parana',
        address: 'Av. Reforma 123',
        email: 'martin.paz@live.com.ar',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        phone: '1234567890',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('admin', 10),
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        name: 'Juan',
        country: 'Arg',
        city: 'Parana',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        address: 'Av. Reforma 123',
        email: 'juan23@gmail.com',
        phone: '1234567890',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('admin', 10),
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        name: 'Mario',
        country: 'Arg',
        city: 'Parana',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        address: 'Av. Reforma 123',
        email: 'maria1@gmail.com',
        phone: '1234567890',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('aasa', 10),
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        name: 'Pedro Ar',
        country: 'Arg',
        city: 'Parana',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        address: 'Av. Reforma 123',
        email: 'pedr@gmail.com',
        phone: '1234567890',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('aava', 10),
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a03',
        name: 'Roqq e',
        country: 'Arg',
        city: 'Parana',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        address: 'Av. Reforma 123',
        email: 'roqq@gmail.com',
        phone: '1234567890',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('affaa', 10),
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      }
    ]);

    await queryInterface.bulkInsert('weights', [
      {
        weight_id: '691e6bf0-f7f9-4490-970a-dfdab5c39a55',
        value: 50,
      },
      {
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        value: 80,
      },
      {
        weight_id: '711e6bf0-f7f9-4090-970a-dfdab5c39a22',
        value: 90,
      }
    ]);

    await queryInterface.bulkInsert('ages', [
      {
        age_id: '701e6bf0-f7f9-4090-970a-dfdab5c39a22',
        type: 'Kids',
        min_age: 5,
        max_age: 17,
      },
      {
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        type: 'Senior',
        min_age: 18,
        max_age: 40,
      },
      {
        age_id: '711e6bf0-f7f9-4090-970a-dfdab5c39a22',
        type: 'Master',
        min_age: 41,
        max_age: 60,
      }
    ]);

    await queryInterface.bulkInsert('styles', [
      {
        style_id: uuidv4(),
        value: 'Gi',
      },
      {
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        value: 'No-Gi',
      },
      {
        style_id: 'aaaa6bf0-f7f9-4090-970a-dfdab5c39b22',
        value: 'Greco',
      }
    ]);

    await queryInterface.bulkInsert('events', [
      {
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        name: 'ACL I',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        start_date: '2024-06-01',
        weighing_date: '2024-06-01',
        end_date: '2024-09-09',
        type: 'Tournament',
        description: 'This is a description of event 1',
        status: 'in progress',
      }, 
      {
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        name: 'ACL II',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        start_date: '2024-06-01',
        weighing_date: '2024-06-01',
        end_date: '2024-06-01',
        type: 'Tournament',
        description: 'This is a description of event 2',
        status: 'active',
      }
    ]);

    await queryInterface.bulkInsert('event_prices', [
      {
        price_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100.0,
        type: 'General',
        quantity: 100,
        valid_from: '2024-06-01',
        valid_to: '2024-06-01',
      },
      {
        price_id: uuidv4(),
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        price: 50.0,
        type: 'General',
        quantity: 100,
        valid_from: '2024-06-01',
        valid_to: '2024-06-01',
      },
    ]);

    await queryInterface.bulkInsert('registrations', [
      {
        registration_id: uuidv4(),
        order_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        order_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        order_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        order_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        order_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a03',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
    ]);

    await queryInterface.bulkInsert('event_parameters', [
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        weight_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '701e6bf0-f7f9-4090-970a-dfdab5c39a22',
      },
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        weight_id:'691e6bf0-f7f9-4090-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
      },
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a594ac40-d362-441e-8fb8-f64460084c19',
        gender_id: 'd98a6c1c-6cde-47a1-a75d-75e188cc5e8a',
        weight_id: '711e6bf0-f7f9-4090-970a-dfdab5c39a22',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
      },
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a594ac40-d362-441e-8fb8-f64460084c19',
        gender_id: 'aa0e22c7-8d83-41d5-a6c2-150cdbbf1b7f',
        weight_id: '691e6bf0-f7f9-4490-970a-dfdab5c39a55',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
      }
    ]);

    await queryInterface.bulkInsert('tickets', [
      {
        ticket_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100,
        type: 'General',
        order_id: uuidv4(),
        purchase_date: '2024-06-01',
        status: 'active',
      },
      {
        ticket_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100,
        type: 'General',
        order_id: uuidv4(),
        purchase_date: '2024-06-01',
        status: 'active',
      },
      {
        ticket_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100,
        type: 'General',
        order_id: uuidv4(),
        purchase_date: '2024-06-01',
        status: 'active',
      }
    ]);
  }