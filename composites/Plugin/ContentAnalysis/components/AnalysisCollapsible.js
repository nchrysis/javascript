import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { getChildrenCount } from "../../../../utils/reactUtils";
import { angleUp, angleDown } from "../../../../style-guide/svg";
import colors from "../../../../style-guide/colors.json";
import { IconButton } from "../../Shared/components/Button";

/**
 * Container for the Collapsible header and its content.
 */
const AnalysisHeaderContainer = styled.div`
	margin: 4px 0 8px 0;
	background-color: ${ colors.$color_white };
`;

/**
 * The clickable component of the analysis header.
 */
const AnalysisHeaderButton = styled( IconButton )`
	width: 100%;
	background-color: ${ colors.$color_white };
	padding: 0;
	border-color: transparent;
	border-radius: 0;
	outline: none;
	justify-content: flex-start;
	box-shadow: none;
	// When clicking, the button text disappears in Safari 10 because of color: activebuttontext.
	color: ${ colors.$color_blue };

	:hover {
		border-color: transparent;
		color: ${ colors.$color_blue };
	}

	:active {
		box-shadow: none;
		background-color: ${ colors.$color_white };
		color: ${ colors.$color_blue };
	}

	svg {
		margin: 0 8px;
		width: 20px;
		height: 20px;
	}
`;

/**
 * The analysis header text.
 */
const AnalysisTitle = styled.span`
	margin: 8px 0;
	word-wrap: break-word;
	font-size: 1.25em;
	line-height: 1.25;
`;

/**
 * Analysis items list.
 */
const AnalysisList = styled.ul`
	margin: 0;
	list-style: none;
	padding: 0 16px 0 13px;
`;

/**
 * A collapsible header used to show sets of analysis results. Expects list items as children.
 * Optionally has a heading around the button.
 *
 * @param {object} props The properties for the component.
 *
 * @returns {ReactElement} A collapsible analysisresult set.
 */
export const AnalysisCollapsibleStateless = ( props ) => {
	let title = props.title;
	let count = getChildrenCount( props.children );
	const Heading = `h${ props.headerLevel }`;

	const StyledHeading = styled( Heading )`
		margin: 0;
		font-weight: normal;
    `;

	return (
		<AnalysisHeaderContainer>
			{ props.hasHeading
				? <StyledHeading><AnalysisHeaderButton
					aria-expanded={ props.isOpen }
					onClick={ props.onToggle }
					icon={ props.isOpen ? angleUp : angleDown }
					iconColor={ colors.$color_grey_dark }
				>
					<AnalysisTitle>{ `${ title } (${ count })` }</AnalysisTitle>
				</AnalysisHeaderButton></StyledHeading>
				: <AnalysisHeaderButton
					aria-expanded={ props.isOpen }
					onClick={ props.onToggle }
					icon={ props.isOpen ? angleUp : angleDown }
					iconColor={ colors.$color_grey_dark }
				>
					<AnalysisTitle>{ `${ title } (${ count })` }</AnalysisTitle>
				</AnalysisHeaderButton>
			}
			{
				props.isOpen && props.children
					? <AnalysisList role="list">{ props.children }</AnalysisList>
					: null
			}
		</AnalysisHeaderContainer>
	);
};

AnalysisCollapsibleStateless.propTypes = {
	title: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	hasHeading: PropTypes.bool,
	headerLevel: PropTypes.string,
	onToggle: PropTypes.func.isRequired,
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] ),
};

AnalysisCollapsibleStateless.defaultProps = {
	hasHeading: false,
	headerLevel: 2,
};

export class AnalysisCollapsible extends React.Component {
	/**
	 * The constructor.
	 *
	 * @param {Object} props The props to use.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: this.props.initialIsOpen,
		};

		this.toggleOpen = this.toggleOpen.bind( this );
	}

	/**
	 * Toggles whether the list is collapsed.
	 *
	 * @returns {void}
	 */
	toggleOpen() {
		this.setState( {
			isOpen: ! this.state.isOpen,
		} );
	}

	/**
	 * Returns the rendered AnalysisCollapsible element.
	 *
	 * @returns {ReactElement} The rendered collapsible analysisHeader.
	 */
	render() {
		return (
			<AnalysisCollapsibleStateless
				title={ this.props.title }
				onToggle={ this.toggleOpen.bind( this ) }
				isOpen={ this.state.isOpen }
				needsHeaderTag={ this.props.hasHeading }
				headerLevel={ this.props.headingLevel }
			>
				{ this.props.children }
			</AnalysisCollapsibleStateless>
		);
	}
}

AnalysisCollapsible.propTypes = {
	title: PropTypes.string.isRequired,
	initialIsOpen: PropTypes.bool,
	hasHeading: PropTypes.bool,
	headingLevel: PropTypes.string,
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] ),
};

AnalysisCollapsible.defaultProps = {
	initialIsOpen: false,
	hasHeading: false,
	headingLevel: 2,
};

export default AnalysisCollapsible;
