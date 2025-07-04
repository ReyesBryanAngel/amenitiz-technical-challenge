import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  Box,
  Typography,
  TextField,
  styled
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { ChessUser } from "../models/UserModel";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import LastOnlineCounter from "./LastOnlineCounter";
dayjs.extend(relativeTime);

type ModalProps = {
  open: boolean;
  onClose: () => void;
  userInfo: ChessUser | null
}

const HiddenInput = styled('input')({ display: 'none' })

const UserProfile = ({ open, onClose, userInfo }: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {'Profile Information'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 4 }}>
        <>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            <Box sx={{ textAlign: 'center', mt: -5, position: 'relative' }}>
              <HiddenInput
                id="upload-photo"
                type="file"
                accept=".jpg,.jpeg,.png"
              />
              <Avatar
                src={userInfo?.avatar || '/default-avatar.png'}
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mt: 3,
                  border: '3px solid white',
                  cursor: 'pointer'
                }} />
              {(userInfo?.verified) ? (
                <CheckCircleIcon
                  color="success"
                  sx={{
                    position: 'absolute',
                    top: 72,
                    right: 'calc(50% - 35px)',
                    bgcolor: '#fff',
                    borderRadius: '50%',
                    fontSize: 28
                  }} />
              ) : (
                (
                  <CancelIcon
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 72,
                      right: 'calc(50% - 35px)',
                      bgcolor: '#fff',
                      borderRadius: '50%',
                      fontSize: 28
                    }} />
                )
              )}
            </Box>
            <div>
              <Typography variant="h6" align="center">
                {userInfo?.name || userInfo?.username}
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                {userInfo?.username || userInfo?.name}
              </Typography>
            </div>
          </div>
          <Box className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Name"
              value={userInfo?.name || ''}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Username"
              value={userInfo?.username || ''}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Title"
              value={userInfo?.title || 'N/A'}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Status"
              value={userInfo?.status || ''}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Location"
              value={userInfo?.location || 'N/A'}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Followers"
              value={userInfo?.followers?.toString() || '0'}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="League"
              value={userInfo?.league || 'N/A'}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Country Code"
              value={userInfo?.country?.split('/').pop() || 'N/A'}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Joined"
              value={dayjs.unix(userInfo?.joined || 0).format('YYYY-MM-DD')}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Box>
        </>
        <Box sx={{ mt: 2}}>
          <LastOnlineCounter lastOnline={userInfo?.last_online || 0} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
