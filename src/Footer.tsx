import {
  copyright,
  email,
  emailLink,
  instagramLink,
  linkedInLink,
  location,
  phoneNumber,
} from '@/common/strings'
import theme from '@/common/theme'
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import PlaceIcon from '@material-ui/icons/Place'
import * as React from 'react'
import { SocialIcon } from 'react-social-icons'

const Footer: React.FC<Props> = ({ classes }) => (
  <div className={classes.footer}>
    <div className={classes.contact}>
      <div className={classes.iconWithText}>
        <PhoneIcon className={classes.icon} />
        <Typography>{phoneNumber}</Typography>
      </div>
      <div className={classes.iconWithText}>
        <EmailIcon className={classes.icon} />
        <Typography>{email}</Typography>
      </div>
      <div className={classes.iconWithText}>
        <PlaceIcon className={classes.icon} />
        <Typography>{location}</Typography>
      </div>
    </div>
    <Typography className={classes.copyright}>
      {copyright(Date.now())}
    </Typography>
    <div className={classes.socialMediaIcons}>
      <SocialIcon url={emailLink} bgColor={theme.palette.secondary.main} />
      <SocialIcon url={linkedInLink} bgColor={theme.palette.secondary.main} />
      <SocialIcon url={instagramLink} bgColor={theme.palette.secondary.main} />
    </div>
  </div>
)

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        height: 200,
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    contact: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'center',
      },
      '& > *': {
        [theme.breakpoints.down('xs')]: {
          textAlign: 'center',
        },
      },
    },
    iconWithText: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 5,
    },
    icon: {
      color: theme.palette.text.primary,
      marginRight: 10,
      fontSize: 14,
    },
    copyright: {
      marginBottom: 5,
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    socialMediaIcons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: 5,
      },
    },
  })

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(Footer)
