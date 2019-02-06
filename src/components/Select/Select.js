import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSelectedTitle } from '../../actionCreators';
import Select from 'react-select';
import { filteredArticlesSelector, filtersSelector } from '../../selectors';

class SelectComp extends Component {
    render() {
        return (
            <Select
                isMulti={true}
                options={this.options}
                value={this.props.selectedOptions}
                onChange={this.handleSelectChange}
            />
        )
    }

    handleSelectChange = (selected) => {
        this.props.dispatchChangeTitle(selected)
    }

    get options() {
        const { articlesFromStore } = this.props;

        return Object.keys(articlesFromStore).map(id => ({
            value: articlesFromStore[id].id,
            label: articlesFromStore[id].title
        }))
    }
}

export default connect(
    store => ({
        articlesFromStore: filteredArticlesSelector(store),
        selectedOptions: filtersSelector(store).selectedTitles
    }),
    dispath => ({
        dispatchChangeTitle: (title) => dispath(changeSelectedTitle(title))
    })
)(SelectComp);