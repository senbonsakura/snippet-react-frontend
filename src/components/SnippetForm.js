import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import {  Input } from 'reactstrap';
import * as Yup from 'yup';
import { startGetOptions } from '../actions/snippet';
import SelectField from './FormSelect';

class SnippetForm extends Component {
  state = {};
  fileMaxSize = 10 * 1000;

  componentDidMount () {
    this.props.getOptions();
  }

  render () {

    return (
      <div>
        <Link to="/" className="btn btn-light mb-1">{"<< Back"}</Link>
        <Formik
          enableReinitialize
          validationSchema={
            Yup.object().shape({
              code: Yup.string().required('Please enter your code'),
              language: Yup.string().required('Please select a language'),
              style: Yup.string().required('Please select a style')
            })
          }
          initialValues={{
            title: this.props.snippet ? this.props.snippet.title : '',
            code: this.props.snippet ? this.props.snippet.code : '',
            linenos: this.props.snippet ? this.props.snippet.linenos : false,
            language: this.props.snippet ? this.props.snippet.language : '',
            style: this.props.snippet ? this.props.snippet.style : '',
            file: this.props.snippet ? this.props.snippet.file : ''
          }}

          onSubmit={(values, {setFieldError, setSubmitting}) => {
            if (!values.code) {
              this.setState(() => {
                setFieldError('code', 'Please enter your code');
              });

            }
            else if (values.file && values.file.size > this.fileMaxSize) {
              this.setState(() => {
                setFieldError('file', 'File size is bigger than 10MB');
              });
            }
            else {

              this.props.onSubmit({
                title: values.title,
                code: values.code,
                linenos: values.linenos,
                language: values.language,
                style: values.style,
                file: values.file || ''
              });
            }

            setSubmitting(false);
          }}
          render={({values, touched, errors, dirty, isSubmitting, setFieldValue}) => (
            <Form className="form">
              <div className="form-group">
                <label htmlFor="title">Title</label>

                <Field
                  type="text"
                  name="title"
                  autoFocus
                  className="form-control"
                  placeholder="Title"
                  id="title"
                />
                {touched.title && errors.title &&
                <div className="alert alert-danger"> className="help-block">{errors.title}</div>}


              </div>
              <div className="form-group">
                <label htmlFor="code">Code</label>


                <CodeMirror
                  onChange={(code) => {
                    setFieldValue('code', code)
                  }}
                  value={values.code}
                  options={
                    {
                      lineNumbers: values.linenos,
                    }
                  }
                />
                {touched.code && errors.code &&
                <div className="alert alert-danger">{errors.code}</div>}
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="linenos"
                    className="form-check-input"
                    checked={values.linenos}
                  />{'Line Numbers'}
                </label>
              </div>


              {this.props.options &&
              <div>
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <Field name={'language'} component={SelectField} options={this.props.options.language}/>
                  {touched.language && errors.language &&
                  <div className="alert alert-danger">{errors.language}</div>}

                </div>

                <div className="form-group">
                  <label htmlFor="style">Style</label>
                  <Field name={'style'} component={SelectField} options={this.props.options.style}/>
                  {touched.style && errors.style &&
                  <div className="alert alert-danger">{errors.style}</div>}

                </div>


              </div>
              }


              <div className="form-group">

                <label htmlFor="language">File</label>
                {values.file && !values.file.name &&
                <p>Current File: <a href={values.file}>{values.file.split('/').pop()} </a></p>}

                <div className="custom-file">
                  <label className="btn btn-primary">Browse
                    <Input hidden type="file" id="inputGroupFile02" onChange={(event) => {
                      setFieldValue('file', event.currentTarget.files[0]);
                    }}/></label><label className="ml-1">{values.file && values.file.name}</label>

                </div>

                {touched.file && errors.file && <div className="alert alert-danger">{errors.file}</div>}

              </div>

              <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block mb-md-2">Save Snippet
              </button>


            </Form>
          )}
        >

        </Formik>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.snippets.options
  };
};
const mapDispatchToProps = (dispatch) => ({
  getOptions: () => dispatch(startGetOptions())

});
export default connect(mapStateToProps, mapDispatchToProps)(SnippetForm);
