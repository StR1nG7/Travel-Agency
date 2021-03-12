import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
	grey: '#c6c7c8',
	grey2: '#969595',
	darkGrey: '#494949',
	lightGrey: '#f5f5f5',
	blue: '#296bdb',
	lightBlue: '#79b8ef',
	blue2: '#1f8ae5',
	yellow: '#ffd700',
};

export const GlobalStyle = createGlobalStyle`
  html{box-sizing:border-box;-ms-overflow-style:scrollbar}*,::after,::before{box-sizing:inherit}.container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}@media (min-width:1200px){.container{max-width:1140px}}.row{display:flex;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.col-12,.col-lg-4,.col-md-6,.col-sm-6,.col-sm-8{position:relative;width:100%;padding-right:15px;padding-left:15px}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}@media (min-width:576px){.col-sm-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}}@media (min-width:768px){.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}}@media (min-width:992px){.col-lg-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}}.mx-auto{margin-right:auto!important}.mx-auto{margin-left:auto!important}
  body,div,ul,ol,li,h1,h2,h3,h4,h5,h6,form,fieldset,input,textarea,img,p,button,span{padding:0;margin:0;border:0;outline:none}
  img{display:block}
  ul,ol{list-style-type:none}
  a:link,a:active,a:visited{text-decoration:none;outline:none;}
  h1,h2,h3,h4,h5,h6{font-family:"Poppins",sans-serif;font-weight:normal;font-size:100%;line-height:1em;color:#222831}
  header,main,nav{display:block}
  body{
    font-family:"Raleway",sans-serif;
    font-weight:400;
    font-size:16px;
    line-height:1.5em;
    color: ${(props) => props.theme.darkGrey};
    box-sizing:border-box
  }
  p{font-size:0.9375em}
  h1 {
    margin: 20px 0;
    font-size:2em;
    font-weight:400;
    @media (min-width: 768px){
      margin: 30px 0;
      font-size:3em;
    }
    @media (min-width: 992px){
      margin: 40px 0;
      font-size:4em;
    }
  }
  h2{font-size:1.8125em;font-weight:700}
  h3{font-size:1.625em;font-weight:600}
  h4{font-size:1.25em;font-weight:600}
  h5{font-size:1.125em;font-weight:600}
  h4,h5{
    margin-bottom:20px;
    @media (min-width: 768px){
      margin-bottom:25px;
    }
    @media (min-width: 992px){
      margin-bottom:30px;
    }
  }
  main {
    padding: 50px 0;
    @media (min-width: 576px){
      padding: 60px 0;
    }
    @media (min-width: 992px){
      padding: 80px 0;
    }
  }
  @media (max-width: 575px){
    .container{
      width:320px;
      padding-left:10px;
      padding-right:10px;
    }
    .row{
      margin-left:-10px;
      margin-right:-10px;
    }
  }
`;

interface IFlex {
	direction?: string,
	wrap?: string,
	justify?: string,
	align?: string
}

export const flex = ({
	direction, wrap, justify, align,
}: IFlex) => (
			`display: flex;
			flex-flow: ${direction || 'row'} ${wrap || 'nowrap'};
			justify-content: ${justify || 'flex-start'};
			align-items: ${align || 'center'};`
	);
