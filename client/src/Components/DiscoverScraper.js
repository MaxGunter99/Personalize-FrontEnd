
// Components
import React from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';

// CSS
import '../css/Puppeteer.css';

export default class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // Jobs and scraper data
            Jobs: [],
            PuppeteerJobs: [],
            bank: {},

            spinner: Math.floor(Math.random() * 4),
            spinnerOpacity: 1,
            spinnerWidth: 50,
            spinnerBorderRadius: 50,

            // Specific url params collected
            SearchFor: {

                WithAllOfTheseWords: [],
                WithTheExactPhrase: [],
                WithAtLeastOneOfTheseWords: [],
                WithNoneOfTheseWords: [],
                WithTheseWordsInTitle: [],
                FromThisCompany: []

            },

            // Specific url params Inputs
            SearchForInputs: {

                WithAllOfTheseWords: '',
                WithTheExactPhrase: '',
                WithAtLeastOneOfTheseWords: '',
                WithNoneOfTheseWords: '',
                WithTheseWordsInTitle: '',
                FromThisCompany: ''

            }

        };

    };

    componentDidMount = () => {

        var bank = {}
    
        Axios
            .get('http://localhost:3001/jobs')
            .then(res => {
    
                let sorted = res.data.sort((a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1);
    
                for (var x in res.data) {
                    let cur = sorted[x].CompanyName.toLowerCase();
                    if (!bank[cur]) {
                        bank[cur] = cur;
                    };
                };

                this.setState({ Jobs: sorted });
    
                if ( localStorage.getItem( 'SearchFor' ) ) {
                    let current = JSON.parse( localStorage.getItem( 'SearchFor' ) )
                    console.log( current )
                    this.setState({
                        ...this.state,
                        SearchFor: current,
                        bank
                    });

                    console.log( 'SearchUsingParams' )
                    return this.SearchUsingParams()

                } else {
                    console.log( 'loadingSuggestions' )
                    return this.loadSuggestions(bank);

                }
    
            })
            .catch(err => {
                console.log('Get Jobs Error:', err);
            })

    };

    loadSuggestions = bank => {

        Axios
            .get('http://localhost:3001/puppeteer')
            .then(results => {

                let filtered = [];

                for (var y = 0; y < results.data.length; y++) {
                    for (var x = 0; x < results.data[y].length; x++) {
                        if (!bank[results.data[y][x].company.toLowerCase()]) {
                            filtered.push(results.data[y][x])
                        };
                    };
                };

                // let sorted = filtered.sort((a, b) => (a.title > b.title) ? 1 : -1);

                this.setState({
                    spinnerOpacity: 0,
                    spinnerWidth: 95,
                    spinnerBorderRadius: 10
                });

                setTimeout(() => {
                    // this.setState({ PuppeteerJobs: sorted }); 
                    this.setState({ PuppeteerJobs: filtered });
                }, 500);

            })
            .catch(err => {
                console.log('Error getting Puppeteer data:', err);
            });
    };

    changeHandler = event => {

        event.preventDefault();

        this.setState({

            SearchForInputs: {
                ...this.state.SearchForInputs,
                [event.target.name]: event.target.value
            }

        });

    };

    handleSubmit = ( event , string ) => {
        event.preventDefault();

        let dictionary = {};
        for ( var x of this.state.SearchFor[ string ] ) {
            dictionary[ x ] = x
        };

        if ( this.state.SearchForInputs[ string ] in dictionary || this.state.SearchForInputs[ string ] === '' ) {
            console.log( 'its already in' )
        } else {
            this.state.SearchFor[ string ].push( this.state.SearchForInputs[ string ] )
        };

        this.setState({
            SearchForInputs: {
                ...this.state.SearchForInputs,
                [string]: ''
            }
        });

        return this.saveSearch()
    }

    handleDeleteItem = ( event , category , item ) => {

        event.preventDefault();

        let newArray = []
        for( var arrayItem in this.state.SearchFor[ category ] ) {
            let current = this.state.SearchFor[ category ][ arrayItem ]
            if ( current !== item ) {
                newArray.push( current )
            }
        };

        this.setState({
            ...this.state,
            SearchFor: {
                ...this.state.SearchFor,
                [ category ]: newArray
            }
        });

        return this.saveSearch()

    }

    clearSearchInfo = event => {

        event.preventDefault();

        this.setState({
            ...this.state,
            SearchFor: {

                WithAllOfTheseWords: [],
                WithTheExactPhrase: [],
                WithAtLeastOneOfTheseWords: [],
                WithNoneOfTheseWords: [],
                WithTheseWordsInTitle: [],
                FromThisCompany: []

            },
            SearchForInputs: {

                WithAllOfTheseWords: '',
                WithTheExactPhrase: '',
                WithAtLeastOneOfTheseWords: '',
                WithNoneOfTheseWords: '',
                WithTheseWordsInTitle: '',
                FromThisCompany: ''

            }
        });

        setTimeout( () => { return this.saveSearch() }, 1 )
    };

    saveSearch = () => {
        localStorage.setItem( 'SearchFor' , JSON.stringify( this.state.SearchFor ) )
    }

    SearchUsingParams = async function( event ) {

        if ( event ) {
            event.preventDefault();
        }

        this.setState({
            ...this.state,
            spinnerOpacity: 1,
            spinnerWidth: 50,
            spinnerBorderRadius: 50,
            PuppeteerJobs: []
        });

        let body = {}

        for ( var SearchItem in this.state.SearchFor ) {
            let current = this.state.SearchFor[ SearchItem ];

            if ( current.length > 0 ) {
                body[ SearchItem ] = String( current.join( ' ' ) )
            }
        }

        Axios
            .post( 'http://localhost:3001/puppeteer' , body )
            .then( res => {

                let filtered = [];

                for (var y = 0; y < res.data.length; y++) {
                    for (var x = 0; x < res.data[y].length; x++) {
                        if (!this.state.bank[res.data[y][x].company.toLowerCase()]) {
                            filtered.push(res.data[y][x])
                        };
                    };
                };

                console.log( this.state.PuppeteerJobs )

                if ( filtered.length === 0 ) {
                    this.setState({
                        ...this.state,
                        PuppeteerJobs: 'No Jobs'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        PuppeteerJobs: filtered
                    })
                }

            })
            .catch( err => {
                console.log( "Error getting jobs using params:" , err )
            })

        
    }

    render() {

        return (

            <div className='Jobs'>

                <nav style = {{ backgroundColor: 'white' }}>
                    <div className = 'SearchSettings'>

                        <form className = 'ParamSection' autoComplete="off" onSubmit = { (e) => this.handleSubmit( e , 'WithAllOfTheseWords' ) }>

                            <h3>With all of these words</h3>

                            { this.state.SearchFor.WithAllOfTheseWords ?

                                <div className = 'AppliedItems'>
                                    { this.state.SearchFor.WithAllOfTheseWords.map( (item) =>
                                        <div className = 'Item'>
                                            <p>{item}</p><FeatherIcon icon="x" onClick = { (e) => this.handleDeleteItem( e , 'WithAllOfTheseWords' , item )  }/>
                                        </div>
                                    )}
                                </div>

                            : <p style = {{ width: 'fit-content' , margin: '0 auto', border: 'none' }} >Empty</p> }

                            <div className = 'InputSection'>
                                <input
                                    name = 'WithAllOfTheseWords'
                                    type = 'text'
                                    placeholder = 'All Of These Words'
                                    value = { this.state.SearchForInputs.WithAllOfTheseWords }
                                    onChange = { this.changeHandler }
                                />
                                <button type = 'submit'><FeatherIcon icon="plus" /></button>
                            </div>

                        </form>

                        <form className = 'ParamSection' autoComplete="off" onSubmit = { (e) => this.handleSubmit( e , 'WithTheExactPhrase' ) }>

                            <h3>With the exact phrase</h3>

                            { this.state.SearchFor.WithTheExactPhrase ?

                                <div className = 'AppliedItems'>
                                    { this.state.SearchFor.WithTheExactPhrase.map( (item) =>
                                        <div className = 'Item'>
                                            <p>{item}</p><FeatherIcon icon="x" onClick = { (e) => this.handleDeleteItem( e , 'WithTheExactPhrase' , item )  }/>
                                        </div>
                                    )}
                                </div>

                            : <p style = {{ width: 'fit-content' , margin: '0 auto', border: 'none' }} >Empty</p> }

                            <div className = 'InputSection'>
                                <input
                                    name = 'WithTheExactPhrase'
                                    placeholder = 'Exact Phrase'
                                    value = { this.state.SearchForInputs.WithTheExactPhrase }
                                    onChange = { this.changeHandler }
                                />
                                <button type = 'submit'><FeatherIcon icon="plus" /></button>
                            </div>

                        </form>

                        <form className = 'ParamSection' autoComplete="off" onSubmit = { (e) => this.handleSubmit( e , 'WithAtLeastOneOfTheseWords' ) }>

                            <h3>With at least one of these words</h3>

                            { this.state.SearchFor.WithAtLeastOneOfTheseWords ?

                                <div className = 'AppliedItems'>
                                    { this.state.SearchFor.WithAtLeastOneOfTheseWords.map( (item) =>
                                        <div className = 'Item'>
                                            <p>{item}</p><FeatherIcon icon="x" onClick = { (e) => this.handleDeleteItem( e , 'WithAtLeastOneOfTheseWords' , item )  }/>
                                        </div>
                                    )}
                                </div>

                            : <p style = {{ width: 'fit-content' , margin: '0 auto', border: 'none' }} >Empty</p> }

                            <div className = 'InputSection'>
                                <input
                                    name = 'WithAtLeastOneOfTheseWords'
                                    placeholder = 'One Of These Words'
                                    value = { this.state.SearchForInputs.WithAtLeastOneOfTheseWords }
                                    onChange = { this.changeHandler }
                                />
                                <button type = 'submit'><FeatherIcon icon="plus" /></button>
                            </div>

                        </form>

                        <form className = 'ParamSection' autoComplete="off" onSubmit = { (e) => this.handleSubmit( e , 'WithNoneOfTheseWords' ) }>

                            <h3>With none of these words</h3>

                            { this.state.SearchFor.WithNoneOfTheseWords ?

                                <div className = 'AppliedItems'>
                                    { this.state.SearchFor.WithNoneOfTheseWords.map( (item) =>
                                        <div className = 'Item'>
                                            <p>{item}</p><FeatherIcon icon="x" onClick = { (e) => this.handleDeleteItem( e , 'WithNoneOfTheseWords' , item )  }/>
                                        </div>
                                    )}
                                </div>

                            : <p style = {{ width: 'fit-content' , margin: '0 auto', border: 'none' }} >Empty</p> }

                            <div className = 'InputSection'>
                                <input
                                    name = 'WithNoneOfTheseWords'
                                    placeholder = 'None Of These Words'
                                    value = { this.state.SearchForInputs.WithNoneOfTheseWords }
                                    onChange = { this.changeHandler }
                                />
                                <button type = 'submit'><FeatherIcon icon="plus" /></button>
                            </div>

                        </form>

                        <form className = 'ParamSection' autoComplete="off" onSubmit = { (e) => this.handleSubmit( e , 'WithTheseWordsInTitle' ) }>

                            <h3>With these words in title</h3>

                            { this.state.SearchFor.WithTheseWordsInTitle ?

                                <div className = 'AppliedItems'>
                                    { this.state.SearchFor.WithTheseWordsInTitle.map( (item) =>
                                        <div className = 'Item'>
                                            <p>{item}</p><FeatherIcon icon="x" onClick = { (e) => this.handleDeleteItem( e , 'WithTheseWordsInTitle' , item )  }/>
                                        </div>
                                    )}
                                </div>

                            : <p style = {{ width: 'fit-content' , margin: '0 auto', border: 'none' }} >Empty</p> }

                            <div className = 'InputSection'>
                                <input
                                    name = "WithTheseWordsInTitle"
                                    placeholder = 'These Words In Title'
                                    value = { this.state.SearchForInputs.WithTheseWordsInTitle }
                                    onChange = { this.changeHandler }
                                />
                                <button type = 'submit'><FeatherIcon icon="plus" /></button>
                            </div>

                        </form>

                        <form className = 'ParamSection' autoComplete="off" onSubmit = { (e) => this.handleSubmit( e , 'FromThisCompany' ) }>

                            <h3>From this company</h3>

                            { this.state.SearchFor.FromThisCompany ?

                                <div className = 'AppliedItems'>
                                    { this.state.SearchFor.FromThisCompany.map( (item) =>
                                        <div className = 'Item'>
                                            <p>{item}</p><FeatherIcon icon="x" onClick = { (e) => this.handleDeleteItem( e , 'FromThisCompany' , item )  }/>
                                        </div>
                                    )}
                                </div>

                            : <p style = {{ width: 'fit-content' , margin: '0 auto', border: 'none' }} >Empty</p> }

                            <div className = 'InputSection'>
                                <input
                                    name="FromThisCompany"
                                    placeholder = 'From This Company'
                                    value={ this.state.SearchForInputs.FromThisCompany }
                                    onChange={ this.changeHandler }
                                />
                                <button type = 'submit'><FeatherIcon icon="plus" /></button>
                            </div>

                        </form>
                    </div>

                    <div className = 'SubmitButtons'>
                        <button onClick = { ( e ) => this.clearSearchInfo( e ) }>Clear All</button>
                        <button onClick = { ( e ) => this.SearchUsingParams( e ) }>Submit</button>
                    </div>

                </nav>

                <h1 style = {{ width: '100%' , display: 'flex', justifyContent: 'center' }}>Indeed Suggestions</h1>

                { this.state.PuppeteerJobs.length > 0 ? (

                    <div className='PuppeteerJobs'>
                        <>
                    
                            { this.state.PuppeteerJobs === 'No Jobs' ? (
                                <div className='PuppeteerBottom'>
                                    <p style = {{ 
                                        color: 'white', 
                                        width: '100%', 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center' 
                                    }}>No Jobs</p>
                                </div>
                            ) : (
                                <>
                                    {this.state.PuppeteerJobs.map((x) =>
                                        <>
                                            {x.title.toLowerCase().includes('php') ||
                                                x.title.toLowerCase().includes('.net') ||
                                                x.title.toLowerCase().includes('lead') ||
                                                x.title.toLowerCase().includes('angular') ||
                                                x.company.toLowerCase() === 'revature' ||
                                                x.title.toLowerCase().includes('senior') ? null :

                                                <div key={x.company} className='PuppeteerJob'>

                                                    <div>
                                                        <h2><strong>{x.title}</strong></h2>
                                                        <h5>{x.company}  ➡︎  {x.location}</h5>
                                                    </div>

                                                    <p>{x.description}</p>

                                                    <div className='PuppeteerBottom'>
                                                        <p>{x.jobBoard}</p>
                                                        <div className='buttons'>
                                                            <NavLink exact to='/AddJob' onClick={() => (localStorage.setItem('ApplyingTo', JSON.stringify(x)))}><FeatherIcon icon="plus" /></NavLink>
                                                            <button onClick={() => window.open(x.URL)}><FeatherIcon icon="eye" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )}
                                </>
                            )}
                        </>

                    </div>

                ):(

                    <div className='LoadingGif' style={{ width: `${this.state.spinnerWidth}%`, transition: '.5s', borderRadius: `${this.state.spinnerBorderRadius}px` }}>
                        {this.state.spinner === 0 ?
                            <img className='LoadingGifImg' alt='SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://cdn.dribbble.com/users/2448190/screenshots/5369677/hud.gif"} />
                        : this.state.spinner === 1 ?
                            <img className='LoadingGifImg' alt='SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://i.pinimg.com/originals/c6/1c/d2/c61cd23ff606ef7b7599ccf2c8dda159.gif"} />
                        : this.state.spinner === 2 ?
                            <img className='LoadingGifImg' alt='SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://i.pinimg.com/originals/f2/d9/c3/f2d9c3dbdc12351f8d32585b8cf5152b.gif"} />
                        : this.state.spinner === 3 ?
                            <img className='LoadingGifImg' alt='SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://thumbs.gfycat.com/DeterminedEssentialHoki-small.gif"} />
                        : this.state.spinner === 4 ?
                            <img className='LoadingGifImg' alt='SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://cdn.dribbble.com/users/31818/screenshots/2035234/dribbb.gif"} />
                        : null}
                    </div>

                )}

            </div>
        )
    }
};