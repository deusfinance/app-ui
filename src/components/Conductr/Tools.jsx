import React, { Component } from 'react';
import SearchBox from './SearchBox';
import AddBox from './AddBox';
import StepViewer from './StepViewer';
import { pilotLogo } from './ui';
import { Route, Switch } from 'react-router-dom';
import TimeLock from './TimeLock';

class Tools extends Component {

    render() {
        const { isFocus, assets, added, removeToken, handleAdd, handleRemove, onFocus, onBlur } = this.props

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
                        handleRemove={handleRemove}
                        isFocus={isFocus} />
                    }
                />
                <Route exact path="/conductr/build/add"
                    render={props => <AddBox {...props}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        assets={assets}
                        added={added}
                        isFocus={isFocus}
                        handleRemove={handleRemove}
                    />
                    }
                />
                <Route exact path="/conductr/build/timelock"
                    render={props => <TimeLock {...props}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        assets={assets}
                        added={added}
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