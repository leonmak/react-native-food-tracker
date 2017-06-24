import React, { Component } from 'react';
import { Grid, Toolbar, Button, Column, SearchField } from '@extjs/ext-react';
import data from './data';
import { small, notSmall } from '../responsiveQueries'

export default class Home extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
        data
    });

    render() {
        return (
            <Grid store={this.store}>
                <Toolbar docked="top">
                    <SearchField 
                        ui="faded" 
                        ref={field => this.query = field} 
                        placeholder="Search..." 
                        onChange={this.onSearch.bind(this)}
                        plugins="responsive"
                        responsiveConfig={{
                            [small]: { 
                                flex: 1
                            }, 
                            [notSmall]: {
                                flex: undefined
                            }
                        }}
                    />
                </Toolbar>
                <Column
                    text="Name"
                    dataIndex="name"
                    flex={2}
                    resizable
                />
                <Column
                    text="Email"
                    dataIndex="email"
                    flex={3}
                    resizable
                    plugins="responsive"
                    responsiveConfig={{ 
                        [small]: { 
                            hidden: true
                        }, 
                        [notSmall]: {
                            hidden: false
                        }
                    }}
                />
                <Column
                    text="Phone"
                    dataIndex="phone"
                    flex={2}
                    resizable
                />
            </Grid>

        )
    }

    /**
     * Filter the store when the user types in the search box
     */
    onSearch = () => {
        const query = this.query.getValue().toLowerCase(); 
        this.store.clearFilter();

        if (query.length) this.store.filterBy(record => {
            const { name, email, phone } = record.data;

            return name.toLowerCase().indexOf(query) !== -1 || 
                email.toLowerCase().indexOf(query) !== -1 || 
                phone.toLowerCase().indexOf(query) !== -1;
        });
    }

}