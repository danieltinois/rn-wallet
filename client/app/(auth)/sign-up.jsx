import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { styles } from "@/assets/styles/auth.styles.js";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const inputRef = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pendingVerification) {
      setCode("");
      setError("");
    }
  }, [pendingVerification]);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.length > 0) {
        setError(err.errors[0].message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ position: "relative", marginBottom: 24 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}
          >
            {[...Array(6)].map((_, i) => {
              const filled = !!code[i];

              return (
                <View
                  key={i}
                  style={{
                    width: 48,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 12,
                    borderColor: error ? COLORS.expense : COLORS.primary,
                    backgroundColor: filled
                      ? "rgba(187, 134, 252, 0.1)"
                      : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "600",
                      color: COLORS.text,
                    }}
                  >
                    {code[i] || ""}
                  </Text>
                </View>
              );
            })}
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(text) => {
              const clean = text.replace(/[^0-9]/g, "");
              if (clean.length <= 6) setCode(clean);
            }}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            maxLength={6}
            autoFocus
            style={{
              position: "absolute",
              opacity: 0,
              width: 1,
              height: 1,
            }}
          />
        </View>
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor={COLORS.textLight}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={username}
          placeholderTextColor={COLORS.textLight}
          placeholder="Enter username"
          onChangeText={(user) => setUsername(user)}
        />

        <View
          style={[styles.inputWithIconContainer, error && styles.errorInput]}
        >
          <TextInput
            style={styles.inputWithIcon}
            autoCapitalize="none"
            value={password}
            placeholderTextColor={COLORS.textLight}
            secureTextEntry={!showPassword}
            placeholder="Enter password"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={COLORS.textLight}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
