import React, { Component } from 'react';
import SearchBox from './SearchBox';
import AddBox from './AddBox';
import StepViewer from './StepViewer';
import { pilotLogo } from './ui';
import { Route, Switch } from 'react-router-dom';

class Tools extends Component {

    render() {
        const { isFocus, assets, added, handleAdd, handleRemove, onFocus, onBlur } = this.props

        return (<div className="tools">
            {pilotLogo()}

            <Switch>
                <Route exact path="/conductr/build"
                    render={props => <SearchBox {...props}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        assets={assets}
                        added={added}
                        handleAdd={handleAdd}
                        isFocus={isFocus} />
                    }
                />
                <Route exact path="/conductr/build/add"
                    render={props => <AddBox {...props}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        assets={assets}
                        isFocus={isFocus}
                        handleRemove={handleRemove}
                    />
                    }
                />
            </Switch>

            <StepViewer stepNumber={1} />

        </div>);
    }
}

export default Tools;