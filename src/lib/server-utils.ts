import 'server-only';
import { ConnectDB } from './config/db';
import Users, { User } from './models/users';
import { getPlaiceholder } from 'plaiceholder';

export const getBlurData = async (url: string) => {
  try {
    const image = await fetch(url);
    if (!image.ok) throw new Error(`Failed to fetch image from ${url}`);
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return { base64 };
  } catch (error) {
    console.log(error);
    return {
      base64: `j6entUiuz//2QAAAaJqdW1iAAAAKWp1bWRjYm9yABEAEIAAAKoAOJtxA2MycGEuaW5ncmVkaWVudAAAAAFxY2JvcqZoZGM6dGl0bGVqaW1hZ2Uud2VicGlkYzpmb3JtYXRkV0VCUGppbnN0YW5jZUlEeCx4bXA6aWlkOjExMjY2ZmFiLTllNWUtNDExMC05MjYzLWFmMzhlYmVkYmM1NG1jMnBhX21hbmlmZXN0o2N1cmx4PnNlbGYjanVtYmY9L2MycGEvdXJuOnV1aWQ6YWVlNWQ3YWEtNDAwYi00NzFhLWE0YzUtNDBlNGY4NzUwYmM2Y2FsZ2ZzaGEyNTZkaGFzaFggqWmHHyIPzquksmrhj59m/mzIdMbqVfDbURNwmW1Tz0ZscmVsYXRpb25zaGlwaHBhcmVudE9maXRodW1ibmFpbKJjdXJseDlzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLnRodW1ibmFpbC5pbmdyZWRpZW50LmpwZWdkaGFzaFgghKtZLwbC6GGBOCR6EBSj4GtCynI3OSTBcqq+O1b15xUAAACwanVtYgAAAChqdW1kY2JvcgARABCAAACqADibcQNjMnBhLmhhc2guZGF0YQAAAACAY2JvcqVqZXhjbHVzaW9uc4GiZXN0YXJ0GgABLopmbGVuZ3RoGb0lZG5hbWVuanVtYmYgbWFuaWZlc3RjYWxnZnNoYTI1NmRoYXNoWCARiwTTFeHj83gmuqD1PIVHwnFLEx6sedbmCSALFvjWymNwYWRKAAAAAAAAAAAAAAAAAiBqdW1iAAAAJGp1bWRjMmNsABEAEIAAAKoAOJtxA2MycGEuY2xhaW0AAAAB9GNib3KoaGRjOnRpdGxlamltYWdlLndlYnBpZGM6Zm9ybWF0ZHdlYnBqaW5zdGFuY2VJRHgseG1wOmlpZDozYmMwZThjOC03YjBmLTRiYTEtOTQwNi00MjNhNmU4M2NjZDdvY2xhaW1fZ2VuZXJhdG9ydkNoYXRHUFQgYzJwYS1ycy8wLjMxLjN0Y2xhaW1fZ2VuZXJhdG9yX2luZm/2aXNpZ25hdHVyZXgZc2VsZiNqdW1iZj1jMnBhLnNpZ25hdHVyZWphc3NlcnRpb25zg6JjdXJseDlzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLnRodW1ibmFpbC5pbmdyZWRpZW50LmpwZWdkaGFzaFgghKtZLwbC6GGBOCR6EBSj4GtCynI3OSTBcqq+O1b15xWiY3VybHgqc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5pbmdyZWRpZW50ZGhhc2hYIEbEMg2qdYnbNLQGJhapZfxLRtv4+K8xnVJQO9eoGim6omN1cmx4KXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaGFzaC5kYXRhZGhhc2hYIAXQYAwoA2bMDwvrJfZLjvG2Xe8HqSEYyk9j+EI+yrr8Y2FsZ2ZzaGEyNTYAADYZanVtYgAAAChqdW1kYzJjcwARABCAAACqADibcQNjMnBhLnNpZ25hdHVyZQAAADXpY2JvctKEWQe3ogEmGCGCWQMtMIIDKTCCAhGgAwIBAgIUTkkWa/Nuvvyy5UHYHXXP6uhNoQ4wDQYJKoZIhvcNAQEMBQAwSjEaMBgGA1UEAwwRV2ViQ2xhaW1TaWduaW5nQ0ExDTALBgNVBAsMBExlbnMxEDAOBgNVBAoMB1RydWVwaWMxCzAJBgNVBAYTAlVTMB4XDTI0MDEzMDE1MzUzNloXDTI1MDEyOTE1MzUzNVowVjELMAkGA1UEBhMCVVMxDzANBgNVBAoMBk9wZW5BSTEQMA4GA1UECwwHQ2hhdEdQVDEkMCIGA1UEAwwbVHJ1ZXBpYyBMZW5zIENMSSBpbiBDaGF0R1BUMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEbuVyU+HRUoRQawTw6kWCx978MbzxNmtoxl7Xt5FQ3s7PZO2TpWo
`,
    };
  }
};

export const getUser = async (query: {
  email?: string;
  id?: string;
  username?: string;
}) => {
  const { email, id, username } = query;

  try {
    //Connect to the DB
    await ConnectDB();

    let user: User | null = null;

    if (email) {
      user = await Users.findOne({ email: email.toLowerCase() }).lean<User>({
        virtuals: true,
      });
    } else if (id) {
      user = await Users.findById(id).lean<User>({
        virtuals: true,
      });
    } else if (username) {
      user = await Users.findOne({
        username: username.toLowerCase(),
      }).lean<User>({
        virtuals: true,
      });
    }
    if (user?._id) user._id = user?._id.toString();
    return user;
  } catch (error) {
    console.log(error);
  }
};
